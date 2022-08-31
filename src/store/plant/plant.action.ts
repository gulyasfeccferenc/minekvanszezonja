import {PLANT_ACTION_TYPES, Plants} from './plant.types';
import {createAction, Action, ActionWithPayload, withMatcher} from '../../utils/reducer/reducer.utils';

export type FetchPlantsStart = Action<PLANT_ACTION_TYPES.FETCH_PLANTS_START>;
export type FetchPlantsSuccess = ActionWithPayload<PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS, Plants[]>;
export type FetchPlantsFailed = ActionWithPayload<PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED, Error>;

export const fetchPlantsStart = withMatcher((): FetchPlantsStart => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_START));

export const fetchPlantsSuccess = withMatcher((plantsArray: Plants[]): FetchPlantsSuccess => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS, plantsArray));

export const fetchPlantsFailed = withMatcher((error: Error): FetchPlantsFailed => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED, error));
