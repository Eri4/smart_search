import { PrismaClient } from '@prisma/client';
import {Combination, Entities, Entity, EntityCombination} from "../types/types";

const prisma = new PrismaClient();

async function findMatchingEntities(searchWords: string[]): Promise<Entities> {
    const entities = await prisma.entity.findMany({
        where: {
            OR: searchWords.map((word) => ({
                name: { contains: word, mode: 'insensitive' },
            })),
        },
    });
    console.log(entities);
    const cities = entities.filter((entity) => entity.type === 'CITY');
    const brands = entities.filter((entity) => entity.type === 'BRAND');
    const dishTypes = entities.filter((entity) => entity.type === 'DISH_TYPE');
    const diets = entities.filter((entity) => entity.type === 'DIET');

    return { cities, brands, dishTypes, diets };
}

function generateCombinations({ cities, brands, dishTypes, diets }: Entities): EntityCombination[] {
    const combinations: EntityCombination[] = [];

    const addCombination = (combination: Combination) => {
        const existingCombination = combinations.find(
            (c) => JSON.stringify(c) === JSON.stringify(combination)
        );
        if (!existingCombination) {
            combinations.push(combination);
        }
    };

    const combinationSets: Combination[][] = [];

    if (cities.length > 0) {
        combinationSets.push(cities.map((city) => ({ city })));
    }
    if (brands.length > 0) {
        combinationSets.push(brands.map((brand) => ({ brand })));
    }
    if (dishTypes.length > 0) {
        combinationSets.push(dishTypes.map((dishType) => ({ dishType })));
    }
    if (diets.length > 0) {
        combinationSets.push(diets.map((diet) => ({ diet })));
    }

    for (const combination of cartesianProduct(...combinationSets)) {
        addCombination(Object.assign({}, ...combination));
    }
    console.log(combinations)
    return combinations;
}

function cartesianProduct<T>(...arrays: T[][]): T[][] {
    return arrays.reduce(
        (acc, curr) => acc.flatMap((x) => curr.map((y) => [...x, y])),
        [[]] as T[][]
    );
}

export async function extract_entities(searchTerm: string): Promise<EntityCombination[]> {
    // Remove special characters
    const cleanedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9\s]/g, '');

    // Split the cleaned search term into individual words
    const words = cleanedSearchTerm.split(/\s+/);

    // Find matching entities
    const entities = await findMatchingEntities(words);

    // Generate combinations of entities
    return generateCombinations(entities);
}