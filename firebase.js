import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyAJiGy5vaXrrGWJt64Co_qsixYPCrkNaJY",

    authDomain: "nos-app-12c78.firebaseapp.com",

    projectId: "nos-app-12c78",

    storageBucket: "nos-app-12c78.firebasestorage.app",

    messagingSenderId: "828913018932",

    appId: "1:828913018932:web:22fb86190cfc212495c261"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };


import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";