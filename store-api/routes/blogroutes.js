const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePosts,
} = require("../controllers/blogs");
const router = express.Router();

router.route("/").get(getAllPosts).post(createPost).delete(deletePosts);
module.exports = router;
