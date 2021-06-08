import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyClQeoiYnePZNGK_5GCQZQ3xyJtUJBGcew',
  authDomain: 'minekvanszezonja.firebaseapp.com',
  databaseURL: 'https://minekvanszezonja.firebaseio.com',
};
firebase.initializeApp(config);
export const { auth } = firebase;
export const db = firebase.database();
