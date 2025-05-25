import axios from "axios";
import { showAlert } from "./alert";

export const createPost = async (formData) => {
  try {
    console.log("Form data being sent:", Object.fromEntries(formData));
    const res = await axios({
      method: "POST",
      url: "/api/v1/blogs",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Post created successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.error("Error details:", err);
    showAlert(
      "error",
      err.response?.data?.message || "Error creating post. Please try again."
    );
  }
};
