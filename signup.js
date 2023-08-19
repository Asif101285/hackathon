
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

  import { getAuth,  createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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
const signUpEmail = document.querySelector("#email").value;
const signUpPassword =document.querySelector("#password").value;
const signupConfirmPassword =document.querySelector("#confirmpassword").value;
if (signUpPassword === signupConfirmPassword) {
    

const auth = getAuth();


createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
.then((userCredential) => {

  const user = userCredential.user;
  alert("signup sucssedfully")
  location.assign("./login.html");
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
});
}
else{
    alert("password must be same")
}

})
  