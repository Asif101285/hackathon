import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import{
    getFirestore,
    collection,
    addDoc,
    query,
    onSnapshot,
    orderBy,
    serverTimestamp,
    doc,
    deleteDoc,
}   from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
    getAuth,
    onAuthStateChanged,
}   from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

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
const db = getFirestore(app);

const auth = getAuth();
const userName = sessionStorage.getItem("currentUserName")
const currentUserUID =sessionStorage.getItem("currentUserUID")
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(user);
    const form = document.querySelector("#form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const titale = document.querySelector("#title").value;
      const inputText = document.querySelector("#inputText").value;
      console.log(inputText);
      try {
        const docRef = await addDoc(collection(db, currentUserUID), {
          titale: titale,
          inputText: inputText,
          createdAt: serverTimestamp(),
        });
        const globalBlog = await addDoc(collection(db, "global"), {
            titale: titale,
            inputText: inputText,
            createdAt: serverTimestamp(),
          });



        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });

    // ...
  } else {
    // User is signed out
    // ...
    console.log("error");
  }
});

