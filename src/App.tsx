import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router';
import NavBar from './components/navigation/NavBar.component';
import {
    auth,
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from './utils/firebase/firebase.utils';
import {getRedirectResult} from 'firebase/auth';
import {setCurrentUser} from './store/user/user.action';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlantsAsync} from './store/plant/plant.action';
import {selectIsPlantsLoading} from './store/plant/plant.selector';
import {Loading} from '@nextui-org/react';

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user: any) => {
            if (user) {
                createUserDocumentFromAuth(user).then();
            }
            dispatch(setCurrentUser(user))
        });
        // @ts-ignore
        dispatch(fetchPlantsAsync())
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
    },[dispatch])

  return (
      <Routes>
          <Route path='/' element={<NavBar />}>
              <Route index element={<><h1>Homi</h1></>} />
          </Route>
      </Routes>
  );
}

export default App;
