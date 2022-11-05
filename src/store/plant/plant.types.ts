export enum PLANT_ACTION_TYPES {
    SET_PLANTS = "SET_PLANTS",
    FETCH_PLANTS_START = 'FETCH_PLANTS_START',
    FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS',
    FETCH_PLANTS_FAILED = 'FETCH_PLANTS_FAILED',
    SAVE_PLANT_ITEM_START = 'SAVE_PLANT_ITEM_START',
    SAVE_PLANT_ITEM_SUCCESS = 'SAVE_PLANT_ITEM_SUCCESS',
    SAVE_PLANT_ITEM_FAILED = 'SAVE_PLANT_ITEM_FAILED',
}

export enum PlantCategory {
    FRUIT = "FRUIT",
    VEGETABLE = "VEGETABLE",
    HERB = "HERB",
    NUT = "NUT"
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
    category_id?: number;
    category: PlantCategory;
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
    category: PlantCategory;
    items?: Array<PlantItem>;
};

export interface IPlantItemRow extends Record<string, any> {
    id: string;
    name: string;
    description?: string;
    imgUrl?: string;
    freshFrom: number;
    freshTo: number;
    storedFrom: number;
    storedTo: number;
};


