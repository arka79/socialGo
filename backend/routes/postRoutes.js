const express = require("express");
const Post = require("../models/Post");
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "socialpost",
  allowed_formats: ["jpg", "jpeg", "png", "webp"],
});

const upload = multer({ storage: storage });

router.post("/create", protect, upload.single("image"), async (req, res) => {
  try {
    const { text } = req.body;
    // Cloudinary provides the secure_url in req.file.path
    const image = req.file ? req.file.path : req.body.image;

    const post = await Post.create({
      userId: req.user.id,
      username: req.user.username,
      text,
      image,
      likes: [],
      comments: [],
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/like/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const username = req.user.username;
    const index = post.likes.indexOf(username);

    if (index === -1) {
      post.likes.push(username);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/comment/:id", protect, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({
      username: req.user.username,
      text,
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
