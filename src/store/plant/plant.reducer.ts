import {PLANT_ACTION_TYPES} from './plant.types';

export const PLANT_INITIAL_STATE = {
    plants: [],
    isLoading: false,
    error: null,
}

export const plantsReducer = (state: any = PLANT_INITIAL_STATE, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case PLANT_ACTION_TYPES.FETCH_PLANTS_START:
            return {...state, isLoading: true };
        case PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS:
            return {...state, plants: payload,  isLoading: false };
        case PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED:
            return {...state, error: payload, isLoading: false };
        case PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_START:
            return {...state, isLoading: true };
        case PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_SUCCESS:
            return {...state, category: payload.category, plants: payload.plantItem,  isLoading: false };
        case PLANT_ACTION_TYPES.SAVE_PLANT_ITEM_FAILED:
            return {...state, error: payload, isLoading: false };
        default:
            return state;
    }
}
