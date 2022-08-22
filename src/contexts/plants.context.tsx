import {createContext, useEffect, useState} from 'react';

import {addCollectionAndDocuments, getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

export const PlantsContext = createContext({
    plants: [],
})

// @ts-ignore
export const PlantsProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.info('categoriesmap', categoryMap);
        }
        getCategories();
    })
    const value = { plants };
    return (
        <PlantsContext.Provider value={value}>
            {children}
        </PlantsContext.Provider>
    )
}
