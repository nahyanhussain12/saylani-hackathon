import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBTJjHPGyoKux9djre6sY9ANacWlzl-O_o",
    authDomain: "website-ea2fa.firebaseapp.com",
    projectId: "website-ea2fa",
    storageBucket: "website-ea2fa.appspot.com",
    messagingSenderId: "686982922686",
    appId: "1:686982922686:web:0f6ecb466dca285ba0f9ef"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btn1 = document.getElementById("login2")
btn1.addEventListener('click',()=>{
const email1 = document.getElementById("email").value
const password1 = document.getElementById("password").value
const sign = document.getElementById("sign")    
    signInWithEmailAndPassword(auth, email1, password1)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        window.location.href = "./index.html"
        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        alert("Wrong Email and password");
        window.location.href = "./signup.html"
    });
})
    