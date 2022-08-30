import {PLANT_ACTION_TYPES, Plants} from './plant.types';
import {PlantAction} from './plant.action';

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
    action = {} as PlantAction
) => {

    switch (action.type) {
        case PLANT_ACTION_TYPES.FETCH_PLANTS_START:
            return {...state, isLoading: true };
        case PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS:
            return {...state, plants: action.payload,  isLoading: false };
        case PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED:
            return {...state, error: action.payload, isLoading: false }
        default:
            return state;
    }
}
