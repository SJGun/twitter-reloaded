import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCsFU5VjShs82MccLUDFvhLJ-EQxqOwLSU",
    authDomain: "twitter-reloaded-ed1d4.firebaseapp.com",
    projectId: "twitter-reloaded-ed1d4",
    storageBucket: "twitter-reloaded-ed1d4.appspot.com",
    messagingSenderId: "918358233535",
    appId: "1:918358233535:web:3b557f32551cf15298510a",
    measurementId: "G-ZT7NMRLD32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const storage= getStorage(app)
export const db= getFirestore(app)