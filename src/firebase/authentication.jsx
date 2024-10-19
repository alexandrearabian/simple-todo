import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";

// Google Sign-In
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error(error.message);
    }
};

// Email/Password Sign-In
export const signInWithEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error.message);
    }
};

// Email/Password Sign-Up
export const signUpWithEmail = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error.message);
    }
};
