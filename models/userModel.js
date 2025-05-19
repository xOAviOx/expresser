const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: [8, "A username must have more than 8 characters"],
    maxLength: [15, "A username must less than 15 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A email is required"],
    unique: true,
    validate: [validator.isEmail, "Please fill correct email."],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "A password is required."],
    minLength: [8, "A password must have more than 8 characters"],
    maxLength: [15, "A password must less than 15 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "User must confirm this password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same,",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  //only run this function when the password is modified
  if (!this.isModified("password")) return next();
  //has the password
  this.password = await bcrypt.hash(this.password, 12);

  //delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});

//find only active users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
