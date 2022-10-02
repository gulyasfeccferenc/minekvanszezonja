import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import {
    getAuth, signInWithRedirect,
    GoogleAuthProvider,
    User,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    NextOrObserver, getRedirectResult,
} from "firebase/auth"
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    getDocs,
    query,
    QueryDocumentSnapshot,
    updateDoc
} from 'firebase/firestore';
import {Plants} from '../../store/plant/plant.types';
import {setCurrentUser} from '../../store/user/user.action';

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

export type ObjectToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
    collectionKey: string,
    objectsToAdd: Array<T>): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((categoryObject) => {
        const docRef = doc(collectionRef, categoryObject.title.toLowerCase());
        batch.set(docRef, categoryObject);
    });

    await batch.commit();
    console.info('Setting collections and documents are successfully finished!');
}

export const getCategoriesAndDocuments = async (document: string): Promise<Plants[]> => {
    const collectionRef = collection(db, document);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Plants);
}

export type AdditionalInformation = {
    displayName?: string;
}

export type UserData = {
    createdAt?: Date;
    displayName?: string;
    email?: string;
    photoURL?: string;
    isAdmin?: boolean;
}

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalParameters = {} as AdditionalInformation
): Promise<void|UserData> => {
    if (userAuth) {
        const userDocRef = doc(db, 'users', userAuth.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (!userSnapshot.exists()) {
            const { displayName, email, photoURL } = userAuth;
            const isAdmin = false;
            const createdAt = new Date();
            try {
                await setDoc(userDocRef, {
                    displayName, email, createdAt, isAdmin, photoURL
                }).then((innerUser) => {})
            } catch (error) {
                console.error('Error creating the user', error)
            }
        } else {
            const { photoURL } = userAuth;
            try {
                await updateDoc(userDocRef, {
                    photoURL
                }).then((innerUser) => {})
            } catch (error) {
                console.error('Error refreshing the user', error)
            }
        }
        return userSnapshot.data() as UserData;
    }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback)

