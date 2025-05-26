const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "A blog must have a title."],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    imageCover: String,
    tags: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A blog must have an author"],
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.pre("save", async function (next) {
  // Create slug from title if not provided
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
