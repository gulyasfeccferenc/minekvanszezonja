export const selectCurrentPlantsMap = (state: any) => {
        return state.plants.plants
            .reduce((acc: any, category: any) => {
                    const {title, items} = category;
                    // @ts-ignore
                    acc[title.toLowerCase()] = items;
                    return acc;
            }, {});
}
