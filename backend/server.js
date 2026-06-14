const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectdb = require("./config/db");

dotenv.config();
connectdb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
