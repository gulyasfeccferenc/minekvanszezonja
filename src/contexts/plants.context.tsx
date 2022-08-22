import {createContext, useState} from 'react';

import {addCollectionAndDocuments} from '../utils/firebase/firebase.utils';

export const PlantsContext = createContext({
    plants: [],
})

// @ts-ignore
export const PlantsProvider = ({ children }) => {
    const [plants, setPlants] = useState([]);

    const value = { plants };
    return (
        <PlantsContext.Provider value={value}>
            {children}
        </PlantsContext.Provider>
    )
}
