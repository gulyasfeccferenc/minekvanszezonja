import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import {
    auth,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'

const LoginComponent = () => {
    useEffect(() => {
        try {
            const redirect = async () => await getRedirectResult(auth);
            redirect().then((response: any) => {
                if (response != null) {
                    const userDocRef = async (response: any) => await createUserDocumentFromAuth(response?.user);
                    userDocRef(response).then();
                }
            })
        } catch (error) {
            console.error('Error while creating user', error);
        }
    }, []);

    const loginWithGoogleRedirect = async () => {
        const { user } = await signInWithGoogleRedirect();
    }

    return (
        <>
            <h2>Login works</h2>
            <button onClick={loginWithGoogleRedirect}>Sign in with gógle</button>
        </>
    )
}

export default LoginComponent;
