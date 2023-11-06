import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDXDgiIezPVbwOBuiDjLuMFqH78VsTHqv4",
    authDomain: "freefood-81e31.firebaseapp.com",
    projectId: "freefood-81e31",
    storageBucket: "freefood-81e31.appspot.com",
    messagingSenderId: "776737631794",
    appId: "1:776737631794:web:aebef8ec6561995cd9562b",
    measurementId: "G-B6G7WZS7VC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google and Facebook providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();




export { auth, googleProvider, facebookProvider };


