import axios from "axios";
import { showAlert } from "./alert";

export const updateUser = async (data) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/update-me",
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", "Profile updated successfully!");
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert(
      "error",
      err.response.data.message || "Error logging in! Please try again."
    );
  }
};
