import dayjs from "dayjs";
import { FastifyInstance, FastifyRequest as Request, FastifyReply as Reponse } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const habits = await prisma.habit.findMany();

    return habits;
  });

  app.get("/test", async () => {
    console.log("Hello word");

    return "Hello NLW";
  });

  app.post("/habits", async (request: Request, response: Reponse) => {
    const createHabitBody = z.object({
      title: z.string(),
      habitWeekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, habitWeekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitWeekDays: {
          create: habitWeekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });

    return response.code(201).send({ statusCode: 201, message: "Habit has created" });
  });

  app.get("/day", async (request: Request, response: Reponse) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    try {
      const { date } = getDayParams.parse(request.query);
    } catch (error) {
      if (error instanceof Error) {
        console.log("erro", error.message);
        return response.code(400).send({ statusCode: 400, error, message: error.message });
      }
    }

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        habitWeekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id;
    });

    return {
      possibleHabits,
      completedHabits,
    };
  });
}
