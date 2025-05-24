const express = require("express");

const viewController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Use isLoggedIn middleware for all routes
router.use(authController.isLoggedIn);

router.get("/", viewController.getBlogs);
router.get("/blog/:slug", authController.isLoggedIn, viewController.getBlog);
router.get("/signup", viewController.getSignUp);
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/me", authController.protect, viewController.getAccount);

module.exports = router;
