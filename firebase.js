import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBu7WGxh3sOXmgmEWU7PWk-ehsyHRCPrTs",
    authDomain: "medcare-9e485.firebaseapp.com",
    projectId: "medcare-9e485",
    storageBucket: "medcare-9e485.appspot.com",
    messagingSenderId: "576144367855",
    appId: "1:576144367855:web:fa446325f43306ff087b1a"
};

// Initialize Firebase if it's not already initialized
const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication instance
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

const db = getFirestore(app);

export { auth, db, storage };