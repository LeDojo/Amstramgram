const {
  getAllPosts,
  createPost,
  showPost,
  updatePost,
  deletePost
} = require("../controllers/postController");

const postRouter = require("express").Router();

postRouter.get("/all", getAllPosts);

postRouter.post("/add", createPost);

postRouter.get("/:id", showPost);

postRouter.put("/edit/:id", updatePost);

postRouter.delete("/delete/:id", deletePost)

module.exports = postRouter;
