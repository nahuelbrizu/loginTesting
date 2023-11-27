import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your Firebase configuration

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "freefood-81e31.firebaseapp.com",
    projectId: "freefood-81e31",
    storageBucket: "freefood-81e31.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google and Facebook providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();




export { auth, googleProvider, facebookProvider };


