const Post = require("../models/postModel");

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (error) {
        res.json({ error: error.message });
    }
}

module.exports = {getAllPosts}