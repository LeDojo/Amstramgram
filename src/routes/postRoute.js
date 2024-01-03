// Importe les fonctions du contrôleur postController
const {
  getAllPosts,
  createPost,
  showPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const { uploadImage } = require("../middlewares/multer");
// Importe le module Router d'Express
const postRouter = require("express").Router();

// Route pour récupérer tous les posts
postRouter.get("/all", getAllPosts);

// Route pour créer un nouveau post
postRouter.post("/add", uploadImage.single("image"), createPost);

// Route pour récupérer un post spécifique en fonction de son ID
postRouter.get("/:id", showPost);

// Route pour mettre à jour un post spécifique en fonction de son ID
postRouter.put("/edit/:id", updatePost);

// Route pour supprimer un post spécifique en fonction de son ID
postRouter.delete("/delete/:id", deletePost);

// Exporte le routeur pour l'utiliser dans d'autres fichiers
module.exports = postRouter;
