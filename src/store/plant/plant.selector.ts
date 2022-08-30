import { createSelector } from 'reselect';
import {PlantState} from './plant.reducer';
import {PlantItem, PlantMap, Plants} from './plant.types';

const selectPlantReducer = (state): PlantState => state.plants;

export const selectPlants = createSelector(
    [selectPlantReducer],
    (plantsSlice: any) => plantsSlice.plants
)

export const selectCurrentPlantsMap = createSelector(
    [selectPlants],
    (plants): PlantMap => plants
    .reduce((acc: Plants, category: Plants) => {
        const {title, items} = category;
        // @ts-ignore
        acc[title.toLowerCase()] = items;
        return acc;
    }, {} as PlantMap));

export const selectIsPlantsLoading = createSelector(
    [selectPlantReducer],
    (plantsSlice: any) => plantsSlice.isLoading
)
