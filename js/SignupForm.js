import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"
import {auth} from './firebase.js';
import {showMessage} from './showMessage.js';

const signUpForm = document.querySelector("#signup-form")

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const email = signUpForm["signup-email"].value;
    const password = signUpForm["signup-password"].value;
 try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    console.log(userCredential)
    console.log(email, password)

    // Cierre el signup modal

    const signupModal = document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    // Resetee el formulario
    signUpForm.reset();

    showMessage("Bienvenido a la sesion  " + userCredential.user.email)

 } catch (error) {
        if (error.code === "auth/invalid-email") {
            showMessage("Email invalido", "error")
        } else if (error.code === "auth/weak-password" ) {
            showMessage("Password corto", "error")
        } else if (error.code === "auth/email-already-in-use") {
            showMessage("Email ya en uso", "error")
        } 
        else if (error.code) {
            showMessage("Algo salio mal, intente de nuevo", "error")
        }
 }
  
})