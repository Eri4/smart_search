import {PrismaClient} from '@prisma/client';
import {Combination, Entities} from '../types/types';

const prisma = new PrismaClient();

async function findMatchingEntities(words: string[]): Promise<Entities> {
    const [cities, brands, dishTypes, diets] = await Promise.all([
        prisma.city.findMany({
            where: {
                OR: words.map((word) => ({
                    name: {
                        contains: word,
                        mode: 'insensitive',
                    },
                })),
            },
        }),
        prisma.brand.findMany({
            where: {
                OR: words.map((word) => ({
                    name: {
                        contains: word,
                        mode: 'insensitive',
                    },
                })),
            },
        }),
        prisma.dishType.findMany({
            where: {
                OR: words.map((word) => ({
                    name: {
                        contains: word,
                        mode: 'insensitive',
                    },
                })),
            },
        }),
        prisma.diet.findMany({
            where: {
                OR: words.map((word) => ({
                    name: {
                        contains: word,
                        mode: 'insensitive',
                    },
                })),
            },
        }),
    ]);

    return { cities, brands, dishTypes, diets };
}

function generateCombinations(entities: Entities): Combination[] {
    const combinations: Combination[] = [];

    entities.cities.forEach(city => {
        entities.brands.forEach(brand => {
            combinations.push({ city, brand });
        });

        entities.dishTypes.forEach(dishType => {
            entities.diets.forEach(diet => {
                combinations.push({ city, dishType, diet });
            });
        });
    });

    if(entities.cities.length === 0) {
        entities.dishTypes.forEach(dishType => {
            entities.diets.forEach(diet => {
                combinations.push({ dishType, diet });
            });
        });
    }

    console.log(entities)
    if(combinations.length === 0) {
        entities.cities.forEach(city => {
            combinations.push({ city });
        });

        entities.dishTypes.forEach(dishType => {
            combinations.push({ dishType });
        });

        entities.brands.forEach(brand => {
            combinations.push({ brand });
        });

        entities.diets.forEach(diet => {
            combinations.push({ diet });
        });
    }

    return combinations;
}

export async function extract_entities(searchTerm: string): Promise<Combination[]> {
    // Remove special characters
    const cleanedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, '');

    // Split the cleaned search term into individual words
    const words = cleanedSearchTerm.split(/\s+/);

    // Find matching entities
    const entities = await findMatchingEntities(words);

    // Generate combinations of entities
    return generateCombinations(entities);
}