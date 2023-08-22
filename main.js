import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {auth} from './js/firebase.js';
import {loginCheck} from './js/loginCheck.js';

import '../js/signUpForm.js'
import '../js/signInForm.js'
import '../js/logout.js'

import {saveTask} from './js/firebase.js'

onAuthStateChanged(auth, (user) => {
    if (user) {
      loginCheck(user);
      const correo = user.email;
      console.log(correo);
    } else {
      //const vacio = "";
      //setupPosts(vacio);
      loginCheck(user);
    }
  });

// Ingresar el titulo, descripcion de la tarea a Firestore

const taskForm = document.getElementById("task-form")
taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const titulo = taskForm["task-title"]
    const descripcion = taskForm["task-description"]
    //console.log(titulo.value, descripcion.value)
    saveTask(titulo.value, descripcion.value)
})
