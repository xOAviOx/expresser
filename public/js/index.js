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
  createPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("excerpt", document.getElementById("excerpt").value);
    formData.append("content", document.getElementById("content").value);
    formData.append("tags", document.getElementById("tags").value);
    const imageCover = document.getElementById("imageCover").files[0];
    if (imageCover) {
      formData.append("imageCover", imageCover);
    }

    // Validation
    if (!formData.get("title")) {
      alert("Please enter a title");
      return;
    }
    if (!formData.get("content")) {
      alert("Please add some content to your post");
      return;
    }

    createPost(formData);
  });
}

if (logOutBtn) logOutBtn.addEventListener("click", logout);
