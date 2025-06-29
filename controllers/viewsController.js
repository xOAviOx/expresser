const Blog = require("../models/blogModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getBlogs = catchAsync(async (req, res, next) => {
  // Get blogs data from collection with author info
  const blogs = await Blog.find()
    .populate({
      path: "author",
      select: "name",
    })
    .sort({ createdAt: -1 });

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
  // get the data for the requested blog
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

exports.getAccount = catchAsync(async (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
});
exports.getMyBlogs = catchAsync(async (req, res, next) => {
  // Get blogs data from collection with author info
  const blogs = await Blog.find({ author: req.user._id })
    .populate("author", "name photo")
    .sort({ createdAt: -1 });

  res.status(200).render("myBlogs", {
    title: "My Blogs",
    blogs,
  });
});

exports.getCreatePost = catchAsync(async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new AppError("Please log in to create a post", 401));
    }

    res.status(200).render("createPost", {
      title: "Create New Post",
      user: req.user,
    });
  } catch (err) {
    console.error("Error rendering create post page:", err);
    return next(new AppError("Error loading create post page", 500));
  }
});
