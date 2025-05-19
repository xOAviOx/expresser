const express = require("express");
const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();
app.use(express.json()); // <-- Add this to parse JSON request bodies

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/blogs/", blogRouter);
module.exports = app;
