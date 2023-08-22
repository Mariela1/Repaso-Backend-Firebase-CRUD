
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import {getAuth} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"
  import { getFirestore, collection, addDoc} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC2fElhkhdv40BEw3YM947aGmodGlAP0bs",
    authDomain: "proyecto-repaso-sesion5.firebaseapp.com",
    projectId: "proyecto-repaso-sesion5",
    storageBucket: "proyecto-repaso-sesion5.appspot.com",
    messagingSenderId: "496521265486",
    appId: "1:496521265486:web:335f19f6d87040510f1e1f"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  //console.log(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Firestore and get a reference to the service
export const db = getFirestore(app);

// CRUD 
// Guardar

export const saveTask = (title, description) => {
  addDoc(collection(db, "tareas"), {
    title,
    description,
  })
};

// Leer

// Editar

// Eliminar





