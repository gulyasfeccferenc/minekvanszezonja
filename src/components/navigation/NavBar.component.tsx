import {signOutUser} from '../../utils/firebase/firebase.utils';
import LoginComponent from '../../pages/auth/Login.component';
import {UserContext} from '../../contexts/user.context';
import {useContext} from 'react';
import {Outlet} from 'react-router';

// @ts-ignore
const NavBar = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="App">
            {currentUser ? <button onClick={signOutUser}>Engedj ki :'(</button> : <LoginComponent />}
            <Outlet />
        </div>
    )
}

export default NavBar;
