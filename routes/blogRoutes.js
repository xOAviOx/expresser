const express = require("express");
const router = express.Router();
const blogController = require("./../controllers/blogController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    blogController.uploadBlogImage,
    blogController.resizeBlogImage,
    (req, res, next) => {
      // Add user from protect middleware after file upload
      req.body.author = req.user.id;
      next();
    },
    blogController.createBlog
  );

router.route("/deleteAll").delete(blogController.deleteAllBlog);
router.route("/deleteBlog/:id").delete(blogController.deleteBlog);
router.route("/myBlogs").get(authController.protect, blogController.getMyBlogs);
module.exports = router;
