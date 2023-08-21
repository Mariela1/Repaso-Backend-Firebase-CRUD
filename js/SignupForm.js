import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"
import {auth} from './firebase.js';

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

 } catch (error) {
        if (error.code === "auth/invalid-email") {
            console.log("Email invalido", "error")
        } else if (error.code === "auth/weak-password" ) {
            console.log("Password corto", "error")
        } else if (error.code === "auth/email-already-in-use") {
            console.log("Email ya en uso", "error")
        } 
        else if (error.code) {
            console.log("Algo salio mal, intente de nuevo", "error")
        }
 }
  
})