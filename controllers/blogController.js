const Blog = require("./../models/blogModel");

exports.getAllBlogs = async (req, res, next) => {
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
};

exports.createBlog = async (req, res, next) => {
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
};
