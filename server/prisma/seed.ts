import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed cities
    await prisma.entity.createMany({
        data: [
            { name: 'London', type: 'CITY' },
            { name: 'Manchester', type: 'CITY' },
        ],
        skipDuplicates: true,
    });

    // Seed brands
    await prisma.entity.createMany({
        data: [
            { name: "McDonald's", type: 'BRAND' },
            { name: "KFC", type: 'BRAND' },
        ],
        skipDuplicates: true,
    });

    // Seed dish types
    await prisma.entity.createMany({
        data: [
            { name: 'Sushi', type: 'DISH_TYPE' },
            { name: 'Pizza', type: 'DISH_TYPE' },
        ],
        skipDuplicates: true,
    });

    // Seed diets
    await prisma.entity.createMany({
        data: [
            { name: 'Vegan', type: 'DIET' },
            { name: 'Vegetarian', type: 'DIET' },
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });