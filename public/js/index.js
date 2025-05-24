import "core-js/stable";
import "regenerator-runtime/runtime";

import { login } from "./login";
import { logout } from "./login";
import { signUp } from "./signup";
import { createPost } from "./createPost";

// DOM ELEMENTS
const loginForm = document.querySelector(".login-form");
const logOutBtn = document.querySelector(".nav__el--logout");
const signUpForm = document.querySelector(".signup-form");
const createPostForm = document.querySelector(".form");

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

if (createPostForm) {
  createPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const excerpt = document.getElementById("excerpt").value;
    const content = document.getElementById("content").value;
    const tags = document.getElementById("tags").value;
    const imageCover = document.getElementById("imageCover").value;
    createPost(title, excerpt, content, tags, imageCover);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);
