import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"
import {auth} from './firebase.js';
import {showMessage} from './showMessage.js';

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", async(e) => {
e.preventDefault();
const email = signInForm["login-email"].value;
const password = signInForm["login-password"].value;
try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    //console.log(email, password, "Bienvenidos a la sesion")
    console.log(userCredentials)
    // Cierre el signin modal
    const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
    modal.hide();
    // Resetee el formulario
    signInForm.reset();
    showMessage("Bienvenido a la sesion  " + userCredentials.user.email)
}
catch (error) {
    if (error.code === "auth/wrong-password") {
        showMessage("Password incorrecto", "error")
    } else if (error.code === "auth/user-not-found") {
        showMessage("No se encuentra el usuario", "error")
    } else {
        showMessage("Otro tipo de error, intente de nuevo", "error")
    }
   
}

})