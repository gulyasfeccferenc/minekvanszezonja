import { createSelector } from 'reselect';

const selectPlantReducer = (state: any) => state.plants;

export const selectPlants = createSelector(
    [selectPlantReducer],
    (plantsSlice: any) => plantsSlice.plants
)

export const selectCurrentPlantsMap = createSelector(
    [selectPlants],
    (plants) => plants
        .reduce((acc: any, category: any) => {
            const {title, items} = category;
            // @ts-ignore
            acc[title.toLowerCase()] = items;
            return acc;
        }, {}));

export const selectIsPlantsLoading = createSelector(
    [selectPlantReducer],
    (plantsSlice: any) => plantsSlice.isLoading
)
