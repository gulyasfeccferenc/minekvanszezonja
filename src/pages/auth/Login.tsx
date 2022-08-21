import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

const Login = () => {

    const loginWithGooglePopup = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    return (
        <>
            <h2>Login works</h2>
            <button onClick={loginWithGooglePopup}>Sign in with gógle</button>
        </>
    )
}

export default Login;
