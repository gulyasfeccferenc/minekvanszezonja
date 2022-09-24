import { PLANT_ACTION_TYPES } from './plant.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

export const setPlants = (plantsArray: any) => createAction(PLANT_ACTION_TYPES.SET_PLANTS, plantsArray);

export const fetchPlantsStart = () => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_START);

export const fetchPlantsSuccess = (plantsArray: any) => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS, plantsArray);

export const fetchPlantsFailed = (error: any) => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED, error);

export const fetchPlantsAsync = () => async (dispatch: any) => {
    console.info('>>>> async izé started');
    dispatch(fetchPlantsStart());
    try {
        const plantsArray = await getCategoriesAndDocuments('plants');
        console.info('planstarray', plantsArray);
        dispatch(fetchPlantsSuccess(plantsArray));
    } catch (error) {
        dispatch(fetchPlantsFailed(error));
    }
}
