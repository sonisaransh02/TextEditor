import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyC6p8A0KgBVcfyO7G4GsOU2E_qtdbzirHk",
    authDomain: "text-editor-69.firebaseapp.com",
    projectId: "text-editor-69",
    storageBucket: "text-editor-69.appspot.com",
    messagingSenderId: "351009020618",
    appId: "1:351009020618:web:2f5c5ebf18209693717233"
  };

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = app.firestore();

export { db };