import axios from "axios";
import { showAlert } from "./alert";

export const createPost = async (title, excerpt, content, tags, imageCover) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/blogs",
      data: {
        title,
        excerpt,
        content,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        imageCover,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Post created successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert(
      "error",
      err.response?.data?.message || "Error creating post. Please try again."
    );
  }
};
