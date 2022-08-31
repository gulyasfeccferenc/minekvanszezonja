import {Plants} from './plant.types';
import {fetchPlantsFailed, fetchPlantsStart, fetchPlantsSuccess} from './plant.action';
import {AnyAction} from 'redux';

export type PlantState = {
    readonly plants: Plants[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const PLANT_INITIAL_STATE: PlantState = {
    plants: [],
    isLoading: false,
    error: null,
}

export const plantsReducer = (
    state: PlantState = PLANT_INITIAL_STATE,
    action = {} as AnyAction
) => {
    if(fetchPlantsStart.match(action)){
        return { ...state, isLoading: true };
    }
    if(fetchPlantsFailed.match(action)){
        return {...state, error: action.payload, isLoading: false };
    }
    if(fetchPlantsSuccess.match(action)){
        return {...state, plants: action.payload,  isLoading: false };
    }
    return state;
}
