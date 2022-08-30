import { signOutUser } from '../../utils/firebase/firebase.utils';
import LoginComponent from '../../pages/auth/Login.component';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCurrentPlantsMap, selectIsPlantsLoading } from '../../store/plant/plant.selector';
import { Loading } from '@nextui-org/react';

// @ts-ignore
const NavBar = () => {
    const isPlantsLoading = useSelector(selectIsPlantsLoading);

    const currentUser = useSelector(selectCurrentUser);
    const plantsMap = useSelector(selectCurrentPlantsMap);
    return (
        <div className="App">
            {currentUser ? <>
                <h1>Szia {currentUser?.displayName?.split(' ')[0]}</h1>
                <button onClick={signOutUser}>Engedj ki :'(</button>
                {isPlantsLoading ? <Loading type="points" /> : <ul>
                    {Object.keys(plantsMap).map((plant: any) => <li key={plant.toString()}>{plant.toString()}</li>)}
                </ul>}
            </> : <LoginComponent />}
            <Outlet />
        </div>
    )
}

export default NavBar;
