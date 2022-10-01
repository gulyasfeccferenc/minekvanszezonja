import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router';
import {checkUserSession, userCheckStart} from './store/user/user.action';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlantsStart} from './store/plant/plant.action';
import {PageshellComponent} from './components/Ui/pageshell.component';
import {HomeComponent} from './pages/Home.component';
import {AboutComponent} from './pages/About.component';
import {NotFoundComponent} from './pages/NotFound.component';
import {PlantDetailComponent} from './pages/PlantDetail.component';
import {PlantCategoryComponent} from './pages/PlantCategory.component';
import {selectIsUserAdmin} from './store/user/user.selector';
import AdminComponent from './pages/Admin/Admin.component';
import {AdminCategoryEditComponent} from './pages/Admin/AdminCategoryEdit.component';
import {AdminItemEditComponent} from './pages/Admin/AdminItemEdit.component';

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    const isAdmin = useSelector(selectIsUserAdmin);
    const location = useLocation()
    return isAdmin ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/login"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userCheckStart());
        // @ts-ignore
        dispatch(checkUserSession());
        // @ts-ignore
        dispatch(fetchPlantsStart());

        //return unsubscribe;
    },[dispatch])

  return (
      <Routes>
          <Route path='/' element={<PageshellComponent />}>
              <Route index element={<HomeComponent />} />
              <Route path='/plants/:categoryId/:plantId' element={<PlantDetailComponent />} />
              <Route path='/plants/:categoryId' element={<PlantCategoryComponent />} />
              <Route path='/about' element={<AboutComponent />} />
              <Route path='/admin' element={<PrivateRoute><AdminComponent /></PrivateRoute>} />
              <Route path='/admin/:categoryId' element={<PrivateRoute><AdminCategoryEditComponent /></PrivateRoute>} />
              <Route path='/admin/:categoryId/:plantId' element={<PrivateRoute><AdminItemEditComponent /></PrivateRoute>} />
              <Route path='*' element={<NotFoundComponent />} />
          </Route>
      </Routes>
  );
}

export default App;
