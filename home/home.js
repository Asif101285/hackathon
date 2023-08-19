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

          window.addEventListener("load", () => {
            const q = query(collection(db, currentUserUID), orderBy("createdAt", "desc"));
            const blogSection = document.querySelector("#blogSection");
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
              blogSection.innerHTML = "";
              querySnapshot.forEach((doc) => {
                const post = document.createElement("div");
                // post.innerText = doc.data().inputText;
                post.classList.add("post");
                post.id = doc.data().id;
                const title = document.createElement("div");
                title.classList.add("title");
                title.innerText = doc.data().title;
                const inputText = document.createElement("div");
                inputText.classList.add("inputText");
                inputText.innerText = doc.data().inputText;
          
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("btn");
                deleteBtn.id = `${doc.data().id}`;
                deleteBtn.innerText = "Delete";
          
                const editBtn = document.createElement("button");
                editBtn.classList.add("btn");
                editBtn.id = `${doc.id}`;
                editBtn.innerText = "Edit";
                post.appendChild(title);
                post.appendChild(inputText);
                post.appendChild(deleteBtn);
                post.appendChild(editBtn);
                blogSection.appendChild(post);
                deleteBtn.addEventListener("click", () =>
                  deletePostFunc(doc.id, doc.data().title)
                );
                //   editBtn.addEventListener("click", () =>
                //     editPostFunc(doc.id, doc.data().inputText)
                //   );
              });
            });
          });
          
          const deletePostFunc = async (id, globalId) => {
            try {
              // Delete from user's personal collection
              await deleteDoc(doc(db, currentUserUID, id));
          
              // Delete from global collection
              const globalQuerySnapshot = await getDocs(
                query(collection(db, "global"), where("title", "==", globalId))
              );
              globalQuerySnapshot.forEach(async (doc) => {
                if (doc.data().title === globalId) {
                  await deleteDoc(doc.ref);
                }
              });
          
              console.log("Document deleted successfully");
            } catch (error) {
              console.error("Error deleting document: ", error);
            }
          };
          
          const generateUniqueId = () => {
            const characters =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const length = 10;
            let uniqueId = "";
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              uniqueId += characters.charAt(randomIndex);
            }
            return `id-${uniqueId}`;
          };


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

