const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! 🔴 Shutting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.MONGO_DB_URI.replace(
  "<PASSWORD>",
  process.env.MONGO_DB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error("❌ DB Connection Failed");
    console.error(err);
  });

const port = process.env.PORT || 3000;
console.log("About to start server...");
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🔴 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
