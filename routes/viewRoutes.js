const express = require("express");

const viewController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");
const blogController = require("./../controllers/blogController");
const router = express.Router();

// Use isLoggedIn middleware for all routes
router.use(authController.isLoggedIn);

router.get("/", viewController.getBlogs);
// Allow public access to blog posts
router.get("/blog/:slug", viewController.getBlog);
router.get("/signup", viewController.getSignUp);
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get(
  "/create-post",
  authController.protect,
  viewController.getCreatePost
);
router.get("/me", authController.protect, viewController.getAccount);
router.get(
  "/my-blogs",
  authController.isLoggedIn,
  authController.protect,
  viewController.getMyBlogs
);
router.delete("/blog/:id", authController.protect, blogController.deleteBlog);

module.exports = router;
