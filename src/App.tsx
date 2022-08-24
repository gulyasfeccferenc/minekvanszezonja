import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router';
import NavBar from './components/navigation/NavBar.component';
import {
    auth,
    createUserDocumentFromAuth,
    getCategoriesAndDocuments,
    onAuthStateChangedListener
} from './utils/firebase/firebase.utils';
import {getRedirectResult} from 'firebase/auth';
import {setCurrentUser} from './store/user/user.action';
import {useDispatch} from 'react-redux';
import {setPlantsMap} from './store/plant/plant.action';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: any) => {
            if (user) {
                createUserDocumentFromAuth(user).then();
            }
            dispatch(setCurrentUser(user))
        });
        const getCategories = async () => {
            const plantsMap = await getCategoriesAndDocuments();
            console.info('plantsMap', plantsMap);
            dispatch(setPlantsMap(plantsMap));
        }
        getCategories();
        try {
            const redirect = async () => await getRedirectResult(auth);

            redirect().then((response: any) => {
                if (response != null) {
                    const userDocRef = async (response: any) => await createUserDocumentFromAuth(response?.user);
                    userDocRef(response).then((user: any) => {
                        dispatch(setCurrentUser(response.user));
                    });
                }
            })
        } catch (error) {
            console.error('Error while creating user', error);
        }
        return unsubscribe;
    },[])

  return (
      <Routes>
          <Route path='/' element={<NavBar />}>
              <Route index element={<><h1>Homi</h1></>} />
          </Route>
      </Routes>
  );
}

export default App;
