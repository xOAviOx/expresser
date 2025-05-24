const express = require("express");
const router = express.Router();
const blogController = require("./../controllers/blogController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    (req, res, next) => {
      // Add user from protect middleware
      req.body.author = req.user.id;
      next();
    },
    blogController.createBlog
  );

router.route("/deleteAll").delete(blogController.deleteAllBlog);
router.route("/deleteBlog/:id").delete(blogController.deleteBlog);
module.exports = router;
