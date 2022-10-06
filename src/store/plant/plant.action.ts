import {PLANT_ACTION_TYPES, PlantItem, Plants} from './plant.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

export const setPlants = (plantsArray: any) => createAction(PLANT_ACTION_TYPES.SET_PLANTS, plantsArray);

export const fetchPlantsStart = () => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_START);

export const fetchPlantsSuccess = (plantsArray: any) => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS, plantsArray);

export const fetchPlantsFailed = (error: any) => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED, error);

export const fetchPlantsAsync = () => async (dispatch: any) => {
    dispatch(fetchPlantsStart());
    try {
        const plantsArray = await getCategoriesAndDocuments('plants');
        dispatch(fetchPlantsSuccess(plantsArray));
    } catch (error) {
        dispatch(fetchPlantsFailed(error));
    }
}

export const savePlantItemStart = (category: Plants|undefined, plantItem: PlantItem) => createAction(PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_START, {category, plantItem});

export const savePlantItemSuccess = () => createAction(PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_SUCCESS);

export const savePlantItemFailed = () => createAction(PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_FAILED);
