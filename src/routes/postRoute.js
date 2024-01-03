const { getAllPosts, createPost, showPost } = require("../controllers/postController");

const postRouter = require("express").Router();

postRouter.get("/all", getAllPosts);

postRouter.post("/add", createPost);

postRouter.get("/:id", showPost);

module.exports = postRouter;
