const catchAsync = require("../utils/catchAsync");
const Blog = require("./../models/blogModel");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author", "name");
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        data: blogs,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

exports.createBlog = catchAsync(async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: blog,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog)
    return res.status(404).json({ status: "fail", message: "Blog Not Found" });

  res.status(200).json({
    status: "success",
    message: "Blog deleted successfully",
  });
});
