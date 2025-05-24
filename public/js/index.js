import "core-js/stable";
import "regenerator-runtime/runtime";

import { login } from "./login";
import { logout } from "./login";

// DOM ELEMENTS
const loginForm = document.querySelector(".login-form");
const logOutBtn = document.querySelector(".nav__el--logout");

// DELEGATION
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);
