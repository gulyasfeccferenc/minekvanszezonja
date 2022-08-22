import React, {useContext, useEffect} from 'react';
import './App.css';
import LoginComponent from './pages/auth/Login.component';
import {signOutUser} from './utils/firebase/firebase.utils';
import {UserContext} from './contexts/user.context';

function App() {
    const { currentUser } = useContext(UserContext);

  return (
    <div className="App">
        {currentUser ? <button onClick={signOutUser}>Engedj ki :'(</button> : <LoginComponent />}
    </div>
  );
}

export default App;
