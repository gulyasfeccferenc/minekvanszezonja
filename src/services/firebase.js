import firebase from "firebase";

const config = {
    apiKey: "",
    authDomain: "minekvanszezonja.firebaseapp.com",
    databaseURL: "https://minekvanszezonja.firebaseio.com"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
