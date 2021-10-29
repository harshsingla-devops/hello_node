const Blog = require("../models/blog");
const getAllPosts = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json({ blogs, nbhits: blogs.length });
};
const createPost = async (req, res) => {
  console.log(req.body);
  const post = await Blog.create(req.body);
  res.status(201).json(post);
};
const deletePosts = async (req, res) => {
  //const { id: Id } = req.params;
  const post = await Blog.deleteMany({});
  res.status(200).json(post);
};

module.exports = { getAllPosts, createPost, deletePosts };
