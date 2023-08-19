
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getAuth,  signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ44Yd5ZzjZZt9dM9XUv5ym4Dr6IaECe0",
  authDomain: "hackathon-f6a97.firebaseapp.com",
  projectId: "hackathon-f6a97",
  storageBucket: "hackathon-f6a97.appspot.com",
  messagingSenderId: "164125290903",
  appId: "1:164125290903:web:6f092e2c236b29c3c114d2"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const signinEmail = document.querySelector("#email").value;
const signinPassword = document.querySelector("#password").value;
const auth = getAuth();
 

signInWithEmailAndPassword(auth, signinEmail, signinPassword)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  alert("sign in sucssedfull")
  // ...
  const currentUserUID = user.uid;
    const currentUserName = user.displayName;
    sessionStorage.setItem("currentUserUID", currentUserUID);
    sessionStorage.setItem("currentUserName", currentUserName);
    setTimeout(() => {
      location.assign("home/home.html");
    }, 2000);
    // ...
    signupForm.reset();
})

.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
});

})

