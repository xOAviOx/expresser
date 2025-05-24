import axios from "axios";
import { showAlert } from "./alert";

export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Signed in successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log("Signup Error:", err);
    showAlert(
      "error",
      err.response?.data?.message || "Error signing up! Please try again."
    );
  }
};
