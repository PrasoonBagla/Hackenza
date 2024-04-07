import React from "react";
import styled from "styled-components";
import { initializeApp } from 'firebase/app';
import Navbar from "../components/Navbar";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from 'react-google-button';
import googleimage from "../images/google-96.png";
import axios from "../service/axios";
import {useNavigate} from 'react-router-dom';
// Import Firestore if you plan to use it. Otherwise, you can remove this import.
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  };
  const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const LoginGoogleOAuth = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dadce0;
  border-radius: 0.6rem;
  margin-bottom: 300px;
  padding: 0.6rem;
  cursor: pointer;
  &:hover {
      background-color: #ffbd4424;
  }
`;

const GoogleImage = styled.img`
  width: 2rem;
  margin-right: 0.5rem;
`;

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
    const signInWithGoogle = async (event) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
    
            console.log(token);
            
            // Assuming "/api/getUser" expects an object with the user's email
            // and that you've set up axios to point to your backend correctly
            const email = user.email;
            const data = await axios.post("/api/getUser", { email: email });
            localStorage.setItem("EmailID",data.data.email);
            console.log(data.data.usertype); // Assuming you want to log the response data
            if(data.data.usertype === "Faculty")
            {
                navigate("/facultydashboard");
            }
            else if(data.data.usertype === "Hod"){
                navigate("/hoddashboard");  
            }
            else if(data.data.usertype === "Admin"){
                navigate("/admindashboard");  
            }
            else if(data.data.usertype === "Student"){
                navigate("/studentdashboard");  
            }
            console.log("Signed in user email:", email);
        } catch (error) {
            console.error("Error during sign in:", error.message);
            // Handle the error as needed
        }
    };
    return (
        <div>
             <Navbar />
             <LoginContainer>
            <LoginGoogleOAuth onClick={signInWithGoogle}>
                <GoogleImage src={googleimage} alt="Google logo" />
                Sign in with Google
            </LoginGoogleOAuth>
        </LoginContainer>
      </div>
    // </div>
    //     </div>
    );
}

export default Login;
