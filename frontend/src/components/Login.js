import React from "react";
import styled from "styled-components";
import { initializeApp } from 'firebase/app';
import Navbar from "../components/Navbar";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from 'react-google-button'
import {useNavigate} from 'react-router-dom';
// Import Firestore if you plan to use it. Otherwise, you can remove this import.
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTJKTh81huvRlSX-Fn55z8WhDE602JUf0",
    authDomain: "hackenza-dfc69.firebaseapp.com",
    projectId: "hackenza-dfc69",
    storageBucket: "hackenza-dfc69.appspot.com",
    messagingSenderId: "261635425914",
    appId: "1:261635425914:web:55c57c2bb715700ffeddc3",
    measurementId: "G-5M1C0PC7KR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const GoogleButton1 = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 150px;
`
const Login = () => {
    const navigate = useNavigate();
    // Function to handle the sign in
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            // Accessing the email of the signed-in user
            const email = user.email;
            console.log(token);
            if(email != null)
            {
                // navigate("/admindashboard");
                // navigate("/facultydashboard");
                navigate("/hoddashboard");
            }
            console.log("Signed in user email:", email);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(errorCode, errorMessage);
            });
    };
    return (
        <div>
             <Navbar />
            <h2>FDCM ALLOTMENT</h2>
            <GoogleButton1><GoogleButton  onClick={signInWithGoogle} Sign in with Google /></GoogleButton1>
            {/* <GoogleButton  onClick={signInWithGoogle} Sign in with Google /> */}
        </div>
    );
}

export default Login;
