const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const blogRouter = require("./routes/blogRoutes");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const path = require("path");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method")); // Add method-override middleware

//serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/blogs/", blogRouter);
app.use("/", viewRouter);
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
