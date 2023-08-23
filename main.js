import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {auth, onGetTasks} from './js/firebase.js';
import {loginCheck} from './js/loginCheck.js';

import '../js/signUpForm.js'
import '../js/signInForm.js'
import '../js/logout.js'

import {saveTask, deleteTask, getTask} from './js/firebase.js'

let editStatus = false;
let id = "";
onAuthStateChanged(auth, async(user) => {
    
    if (user) {
      loginCheck(user);
      const correo = user.email;
      console.log(correo);
    try {

        
        // Ingresar el titulo, descripcion de la tarea a Firestore
        const taskForm = document.getElementById("task-form")
        taskForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const titulo = taskForm["task-title"]
        const descripcion = taskForm["task-description"]
        //console.log(titulo.value, descripcion.value)
        saveTask(titulo.value, descripcion.value)

        taskForm.reset();
        
    
        });
    } catch(error) {
        console.log(error);
    }
    const tasksContainer = document.getElementById("taks-container");
    onGetTasks((querySnapShot) => {
        tasksContainer.innerHTML = "";
        querySnapShot.forEach((doc) => {
           console.log("doc",doc.data());
             const task = doc.data();
             tasksContainer.innerHTML += `
                    <li class="list-group-item list-group-item-action mt-2">
                        <h5>${task.titulo}</h5>
                        <p>${task.descripcion}</p>
                        <div>
                            <button class="btn btn-danger btn-delete" data-id="${doc.id}">Eliminar</button>
                            <button class="btn btn-success btn-edit" data-id="${doc.id}"> Editar </button>
                        </div>
                    </li>
                `;
        })
 

    // Eliminar
    
    const btnsDelete = document.querySelectorAll(".btn-delete")
    //console.log(btnsDelete)
    btnsDelete.forEach((btn) => 
        btn.addEventListener("click", async ({target: {dataset}})=> {
            try {
                await deleteTask(dataset.id);
            } catch (error) {
                console.log(error);
            }
          
        })
    );

    // Editar 
    const btnsEdit = document.querySelectorAll(".btn-edit")
    console.log(btnsEdit)
        btnsEdit.forEach((btn) =>
            btn.addEventListener("click", async ({target: {dataset}}) => {
               
                    const doc = await getTask(dataset.id);
                    const task = doc.data();
                    const taskForm2 = document.getElementById("task-form");
                    taskForm2["task-title"].value = task.titulo;
                    taskForm2["task-description"].value = task.descripcion;
                    editStatus = true;
                    console.log(editStatus)
                    id = doc.id;
                    taskForm2['btn-task-form'].innerText = "Actualizar";
                
            })
        )
    
    })
    
    } else {

      //const vacio = "";
      //setupPosts(vacio);
      const tasksContainer = document.getElementById("taks-container");
      tasksContainer.innerHTML = `
        <h3 class="text-white">Inicia sesion para ver tus publicaciones</h3>
      `;
      loginCheck(user);
    }
  


});


