import {PLANT_ACTION_TYPES, Plants} from './plant.types';
import { createAction, Action, ActionWithPayload } from '../../utils/reducer/reducer.utils';

export type FetchPlantsStart = Action<PLANT_ACTION_TYPES.FETCH_PLANTS_START>;
export type FetchPlantsSuccess = ActionWithPayload<PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS, Plants[]>;
export type FetchPlantsFailed = ActionWithPayload<PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED, Error>;

export type PlantAction = FetchPlantsStart | FetchPlantsSuccess | FetchPlantsFailed;

export const fetchPlantsStart = (): FetchPlantsStart => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_START);

export const fetchPlantsSuccess = (plantsArray: Plants[]): FetchPlantsSuccess => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_SUCCESS, plantsArray);

export const fetchPlantsFailed = (error: Error): FetchPlantsFailed => createAction(PLANT_ACTION_TYPES.FETCH_PLANTS_FAILED, error);
