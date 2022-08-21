import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, User } from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyClQeoiYnePZNGK_5GCQZQ3xyJtUJBGcew",
    authDomain: "minekvanszezonja.firebaseapp.com",
    databaseURL: "https://minekvanszezonja.firebaseio.com",
    projectId: "minekvanszezonja",
    storageBucket: "minekvanszezonja.appspot.com",
    messagingSenderId: "526417473991",
    appId: "1:526417473991:web:7cb9385c83dfcdd22469e2",
    measurementId: "G-R1BR9H8WE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: User) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            }).then(() => {
                console.info('User created', displayName);
            })
        } catch (error: any) {
            console.error('Error creating the user', error?.message)
        }
    }
};
