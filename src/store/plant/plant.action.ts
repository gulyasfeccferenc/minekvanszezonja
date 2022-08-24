import { PLANT_ACTION_TYPES } from './plant.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setPlants = (plantsArray: any) => createAction(PLANT_ACTION_TYPES.SET_PLANTS, plantsArray);
