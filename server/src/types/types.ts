export interface Entity {
    id: number;
    name: string;
}

export interface Entities {
    cities: Entity[];
    brands: Entity[];
    dishTypes: Entity[];
    diets: Entity[];
}

export interface Combination {
    city?: Entity;
    brand?: Entity;
    dishType?: Entity;
    diet?: Entity;
}

export interface EntityCombination {
    city?: { id: number; name: string };
    brand?: { id: number; name: string };
    dishType?: { id: number; name: string };
    diet?: { id: number; name: string };
}