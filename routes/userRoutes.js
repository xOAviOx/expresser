const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController.js");
const router = express.Router();

// router.route("/").get();
router.route("/").get(userController.getAllUsers);
router.post("/signup", authController.signUp);
// router.post("/login", authController.login);

module.exports = router;
