import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyDxaDRNegP7ZBMqUmhMLf9JWbSjBhmwduc",
    authDomain: "snipboard-11a66.firebaseapp.com",
    projectId: "snipboard-11a66",
    storageBucket: "snipboard-11a66.appspot.com",
    messagingSenderId: "745024624255",
    appId: "1:745024624255:web:6323a5b7167b49ce03114a",
    measurementId: "G-RZ11MG8F1S"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export { functions };