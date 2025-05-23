const express = require("express");

const viewController = require("./../controllers/viewsController");
const { protect, isLoggedIn } = require("../controllers/authController");
const router = express.Router();

router.get("/", viewController.getBlogs);
module.exports = router;
