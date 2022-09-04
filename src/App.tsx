import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router';
import {
    auth,
    createUserDocumentFromAuth,
    onAuthStateChangedListener
} from './utils/firebase/firebase.utils';
import {getRedirectResult} from 'firebase/auth';
import {setCurrentUser} from './store/user/user.action';
import {useDispatch} from 'react-redux';
import {fetchPlantsStart} from './store/plant/plant.action';
import {PageshellComponent} from './components/Ui/pageshell.component';
import {HomeComponent} from './pages/Home.component';
import {AboutComponent} from './pages/About.component';
import {NotFoundComponent} from './pages/NotFound.component';

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
        dispatch(fetchPlantsStart());
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
          <Route path='/' element={<PageshellComponent />}>
              <Route index element={<HomeComponent />} />
              <Route path='/about' element={<AboutComponent />} />
              <Route path='*' element={<NotFoundComponent />} />
          </Route>
      </Routes>
  );
}

export default App;
