import "core-js/stable";
import "regenerator-runtime/runtime";

import { login } from "./login";
import { logout } from "./login";
import { signUp } from "./signup";
// DOM ELEMENTS
const loginForm = document.querySelector(".login-form");
const logOutBtn = document.querySelector(".nav__el--logout");
const signUpForm = document.querySelector(".signup-form");
// DELEGATION
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("confirmPassword").value;
    signUp(name, email, password, passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);
