import { createSelector } from 'reselect';
import {PlantState} from './plant.reducer';
import {PlantMap, Plants} from './plant.types';
import {RootState} from '../store';

const selectPlantReducer = (state: RootState): PlantState => state.plants;

export const selectPlants = createSelector(
    [selectPlantReducer],
    (plantsSlice: any) => plantsSlice.plants
)

export const selectCurrentPlantsMap = createSelector(
    [selectPlants],
    (plants): PlantMap => plants
    .reduce((acc: Plants, category: Plants) => {
        const {id, items} = category;
        // @ts-ignore
        acc[id.toLowerCase()] = {items, ...category};
        return acc;
    }, {} as PlantMap));

export const selectIsPlantsLoading = createSelector(
    [selectPlantReducer],
    (plantsSlice: any) => plantsSlice.isLoading
)
