const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

//all the protected routes after this

router.route("/").get(authController.protect, userController.getAllUsers);

module.exports = router;
