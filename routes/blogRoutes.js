const express = require("express");
const router = express.Router();
const blogController = require("./../controllers/blogController");
router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router.route("/deleteBlog/:id").delete(blogController.deleteBlog);
module.exports = router;
