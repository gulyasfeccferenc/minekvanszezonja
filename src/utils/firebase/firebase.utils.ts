
import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithRedirect,
    GoogleAuthProvider,
    User,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
    query
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: any) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((categoryObject: any) => {
        const docRef = doc(collectionRef, categoryObject.title.toLowerCase());
        batch.set(docRef, categoryObject);
    });

    await batch.commit();
    console.info('Setting collections and documents are successfully finished!');
}

export const getCategoriesAndDocuments = async (document: string) => {
    const collectionRef = collection(db, document);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth: User | null, additionalParameters?: {[name: string]: string}) => {
    if (userAuth) {
        const userDocRef = doc(db, 'users', userAuth.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();
            try {
                await setDoc(userDocRef, {
                    displayName, email, createdAt
                }).then((innerUser) => {})
            } catch (error: any) {
                console.error('Error creating the user', error?.message)
            }
        }
        return userSnapshot;
    }
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: any) => onAuthStateChanged(auth, callback)
