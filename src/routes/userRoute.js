// Importe les fonctions du contrôleur userController
const { store, login } = require("../controllers/userController");

// Importe le module Router d'Express
const userRouter = require("express").Router();

// Route pour gérer l'inscription d'un utilisateur
userRouter.post("/inscription", store);

// Route pour gérer la connexion d'un utilisateur
userRouter.post("/connexion", login);

// Exporte le routeur pour l'utiliser dans d'autres fichiers
module.exports = userRouter;
