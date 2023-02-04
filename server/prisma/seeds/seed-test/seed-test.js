"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.habit.deleteMany();
    const alice = await prisma.habit.create({
        data: {
            title: "Beber 2L de água",
            created_at: "2023-01-01T00:00:00.000Z",
        },
    });
    console.log({ alice });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed-test.js.map