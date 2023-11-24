// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6kTKH2kub1NPMqYG1exiTF8thpYUsn58",
    authDomain: "parcel-tracker-8ab9f.firebaseapp.com",
    projectId: "parcel-tracker-8ab9f",
    storageBucket: "parcel-tracker-8ab9f.appspot.com",
    messagingSenderId: "365157472147",
    appId: "1:365157472147:web:7963e8826756fe3d4afa66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;