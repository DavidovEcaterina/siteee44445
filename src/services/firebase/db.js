import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARc979AEJ8m6w7f13MveJAovV2C38YGiA",
  authDomain: "shop-9d86d.firebaseapp.com",
  projectId: "shop-9d86d",
  storageBucket: "shop-9d86d.appspot.com",
  messagingSenderId: "1044772732297",
  appId: "1:1044772732297:web:ea05c3fca6ca8a36d1b558"
};


const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);

async function register({firstname, lastname, email, password}) {
    const resp = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(resp.user, {displayName: '${firstname} ${lastname}'});
}

async function login({email, password}) {
    const resp = await signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    return resp.user;

}

async function logout () {
    await signOut(auth);
}

export const firebasedb = {
    register: register,
    login: login,
    logout: logout
}