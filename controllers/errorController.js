const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorProd = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith("/api")) {
    //Operational,trusted error:send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      //Programming or other unknown error:don't leak error details
    } else {
      //Log error
      console.error("ERROR 🔴", err);
      //Send generic message
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  } else {
    //Rendered website
    if (err.isOperational) {
      res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: err.message,
      });
      //Programming or other unknown error:don't leak error details
    } else {
      //Log error
      console.error("ERROR 🔴", err);
      //Send generic message
      res.status(err.statusCode).render("error", {
        title: "Something went wrong!",
        msg: "Please try again later",
      });
    }
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = Object.create(err);

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
  sendErrorProd(error, req, res);
};
