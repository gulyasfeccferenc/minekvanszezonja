import {signOutUser} from '../../utils/firebase/firebase.utils';
import LoginComponent from '../../pages/auth/Login.component';
import { useSelector } from 'react-redux';
import {Outlet} from 'react-router';
import {selectCurrentUser} from '../../store/user/user.selector';
import {selectCurrentPlantsMap} from '../../store/plant/plant.selector';

// @ts-ignore
const NavBar = () => {
    const currentUser = useSelector(selectCurrentUser);
    const plantsMap = useSelector(selectCurrentPlantsMap);
    return (
        <div className="App">
            {currentUser ? <>
                <h1>Szia {currentUser?.displayName?.split(' ')[0]}</h1>
                <button onClick={signOutUser}>Engedj ki :'(</button>
                <ul>
                    {Object.keys(plantsMap).map((plant: any) => <li>{plant.toString()}</li>)}
                </ul>
            </> : <LoginComponent />}
            <Outlet />
        </div>
    )
}

export default NavBar;
