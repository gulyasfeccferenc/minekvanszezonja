import {PLANT_ACTION_TYPES, PlantItem, Plants} from './plant.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setPlants = (plantsArray: any) => createAction(PLANT_ACTION_TYPES.SET_PLANTS, plantsArray);

export const fetchPlantsStart2 = () => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_START);

export const fetchPlantsSuccess = (plantsArray: any) => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS, plantsArray);

export const fetchPlantsFailed = (error: any) => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED, error);

export const fetchPlants = () => async (dispatch: any) => {
    dispatch(fetchPlantsStart2());
    try {
        const response = await fetch('http://localhost:4000/species').then(res => res.json());
        const plantsArray = response;
        console.info('EZ AZ A plantsarray', plantsArray);
        dispatch(fetchPlantsSuccess(plantsArray));
    } catch (error) {
        dispatch(fetchPlantsFailed(error));
    }
}

export const savePlantItemStart = (category: Plants|undefined, plantItem: PlantItem) => createAction(PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_START, {category, plantItem});

export const savePlantItemSuccess = () => createAction(PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_SUCCESS);

export const savePlantItemFailed = () => createAction(PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_FAILED);
