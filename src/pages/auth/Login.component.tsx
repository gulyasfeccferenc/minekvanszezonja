import {
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'


const LoginComponent = () => {
    return (
        <>
            <h2>Login works</h2>
            <button onClick={signInWithGoogleRedirect}>Sign in with gógle</button>
        </>
    )
}

export default LoginComponent;
