import { PLANT_ACTION_TYPES } from './plant.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setPlantsMap = (plantsMap: any) => createAction(PLANT_ACTION_TYPES.SET_PLANTS_MAP, plantsMap);
