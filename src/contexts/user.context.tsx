import React, {createContext, useEffect, useState} from 'react';
import {auth, createUserDocumentFromAuth, onAuthStateChangedListener} from '../utils/firebase/firebase.utils';
import {getRedirectResult} from 'firebase/auth';


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: (user: any) => null
})

// @ts-ignore
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: any) => {
            if (user) {
                createUserDocumentFromAuth(user).then();
            }
            setCurrentUser(user);
        });
        try {
            const redirect = async () => await getRedirectResult(auth);

            redirect().then((response: any) => {
                if (response != null) {
                    const userDocRef = async (response: any) => await createUserDocumentFromAuth(response?.user);
                    userDocRef(response).then((user: any) => {
                        setCurrentUser(response.user);
                    });
                }
            })
        } catch (error) {
            console.error('Error while creating user', error);
        }
    },[])

    // @ts-ignore
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
