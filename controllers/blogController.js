const catchAsync = require("../utils/catchAsync");
const Blog = require("./../models/blogModel");

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blogs = await Blog.find().populate("author", "name");
  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      data: blogs,
    },
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: blog,
    },
  });
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
exports.deleteAllBlog = catchAsync(async (req, res, next) => {
  await Blog.deleteMany();
  res.status(200).json({
    status: "success",
    message: "All blogs have been deleted.",
  });
});
