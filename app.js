const express = require("express");
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.json()); // <-- Add this to parse JSON request bodies

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/blogs/", blogRouter);
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
