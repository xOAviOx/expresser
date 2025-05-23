const express = require("express");
const blogRouter = require("./routes/blogRoutes");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const path = require("path");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

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
