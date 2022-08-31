export enum PLANT_ACTION_TYPES {
    SET_PLANTS = "SET_PLANTS",
    FETCH_PLANTS_START = 'FETCH_PLANTS_START',
    FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS',
    FETCH_PLANTS_FAILED = 'FETCH_PLANTS_FAILED',
}

export type PlantItem = {
    id: string | number;
    name: string;
    description?: string;
    imageUrl: string;
    freshFrom: number;
    freshTo: number;
    storedFrom: number;
    storedTo: number;
}

export type Plants = {
    title: string;
    description: string;
    imageUrl: string;
    category: Array<string>;
    items: Array<PlantItem>;
}

export type PlantMap = {
    [key: string]: PlantItem
}
