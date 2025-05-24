const Blog = require("../models/blogModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getBlogs = catchAsync(async (req, res, next) => {
  // Get blogs data from collection with author info
  const blogs = await Blog.find().populate({
    path: "author",
    select: "name",
  });

  if (!blogs) {
    return next(new AppError("No blogs found", 404));
  }

  // Render template using blog data
  res.status(200).render("blogs", {
    title: "All Blogs",
    blogs,
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  // Get the data for the requested blog
  const blog = await Blog.findOne({ slug: req.params.slug }).populate({
    path: "author",
    select: "name",
  });

  if (!blog) {
    return next(new AppError("No blog found with that name.", 404));
  }

  res.status(200).render("blog", {
    title: blog.title,
    blog,
  });
});

exports.getLogin = catchAsync(async (req, res) => {
  res.status(200).render("login", {
    title: "Log into EXpresser",
  });
});
exports.getSignUp = catchAsync(async (req, res) => {
  res.status(200).render("signup", {
    title: "Sign into EXpresser",
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Create your account",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};
