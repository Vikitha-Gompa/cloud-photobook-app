// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWd6f4A_3UZRtM5Vezal7rVz2xT31-fdQ",
    authDomain: "vgompa-cmsc5373-webapp.firebaseapp.com",
    projectId: "vgompa-cmsc5373-webapp",
    storageBucket: "vgompa-cmsc5373-webapp.firebasestorage.app",
    messagingSenderId: "648748508062",
    appId: "1:648748508062:web:34b021f24ab622049cac8f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);