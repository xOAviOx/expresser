const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Blog = require("./../models/blogModel");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadBlogImage = upload.single("imageCover");

exports.resizeBlogImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // generate unique filename
  req.file.filename = `blog-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(1200, 600, { fit: "cover" })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${process.cwd()}/public/img/blogs/${req.file.filename}`);

  // add filename to req.body so it can be saved to database
  req.body.imageCover = req.file.filename;

  next();
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  // dind all blogs, populate author, and sort
  const blogs = await Blog.find()
    .populate("author", "name")
    .sort({ createdAt: -1 }); // this will sort by newest first

  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      data: blogs,
    },
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  // add author from the authenticated user
  const blogData = {
    ...req.body,
    author: req.user._id,
  };

  const blog = await Blog.create(blogData);

  // populate the author information before sending response
  const populatedBlog = await Blog.findById(blog._id).populate(
    "author",
    "name photo"
  );
  console.log("Final imageCover being saved to DB:", req.body.imageCover);

  res.status(201).json({
    status: "success",
    data: {
      data: populatedBlog,
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
