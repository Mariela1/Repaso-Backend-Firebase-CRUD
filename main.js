import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {auth} from './js/firebase.js';
import {loginCheck} from './js/loginCheck.js';

import '../js/signUpForm.js'
import '../js/signInForm.js'
import '../js/logout.js'

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
