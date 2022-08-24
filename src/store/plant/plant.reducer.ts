import {PLANT_ACTION_TYPES} from './plant.types';

export const PLANT_INITIAL_STATE = {
    plants: []
}

export const plantsReducer = (state: any = PLANT_INITIAL_STATE, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case PLANT_ACTION_TYPES.SET_PLANTS:
            return {...state, plants: payload};
        default:
            return state;
    }
}
