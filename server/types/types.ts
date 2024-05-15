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