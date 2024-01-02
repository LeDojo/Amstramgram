const { getAllPosts } = require("../controllers/postController");

const postRouter = require("express").Router();

postRouter.get("/all", getAllPosts);

module.exports = postRouter;
