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
    imgUrl: string;
    freshFrom: number;
    freshTo: number;
    storedFrom: number;
    storedTo: number;
}

export type Plants = {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    category: Array<string>;
    items?: Array<PlantItem>;
}

export type PlantMap = {
    [key: string]: PlantItem;
}

export interface IPlantCategoryRow extends Record<string, any> {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    category: Array<string>;
    items?: Array<PlantItem>;
};
