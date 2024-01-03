const Post = require("../models/postModel");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { description, image } = req.body;
  try {
    const newPost = await Post.create({ description, image });
    res.json(newPost);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const showPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    res.json({ error: error.message });
  }
};


module.exports = { getAllPosts, createPost, showPost };
