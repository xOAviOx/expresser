const Blog = require("../models/blogModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getBlogs = catchAsync(async (req, res) => {
  //get blogs data from collection
  const blogs = await Blog.find();

  //render that template using blog data
  res.status(200).render("blogs", {
    title: "All blogs",
    blogs,
  });
});