// Importe le modèle User depuis le fichier userModel.js
const User = require("../models/userModel");

// Importe la bibliothèque jsonwebtoken pour la gestion des tokens JWT
const jwt = require("jsonwebtoken");

// Fonction pour créer un nouvel utilisateur et générer un token JWT
const store = async (req, res) => {
  try {
    // Crée une nouvelle instance de l'utilisateur avec les données fournies dans le corps de la requête
    const user = new User();
    user.email = req.body.email;

    // Utilise la méthode encryptPassword pour hasher le mot de passe avant de le sauvegarder
    user.password = await user.encryptPassword(req.body.password);

    // Sauvegarde l'utilisateur dans la base de données
    user.save();

    // Génère un token JWT contenant l'ID de l'utilisateur et signé avec une clé secrète
    const token = jwt.sign({ id: user.id }, "simplon-secret", {
      expiresIn: "1d",
    });

    // Renvoie l'utilisateur créé et le token en réponse JSON
    res.json({ user, token });
  } catch (error) {
    // Gère les erreurs en affichant le message d'erreur dans la console
    console.error(error.message);
  }
};

// Fonction pour authentifier un utilisateur et générer un token JWT en cas de succès
const login = async (req, res) => {
  // Récupère l'email à partir du corps de la requête
  const email = req.body.email;

  try {
    // Recherche l'utilisateur dans la base de données en utilisant l'email fourni
    const user = await User.findOne({ email }).select("+password");

    // Si l'utilisateur n'est pas trouvé, lance une erreur d'authentification
    if (!user) {
      const error = new Error("Invalid");
      throw error;
    }

    // Vérifie la validité du mot de passe en utilisant la méthode validPassword de l'utilisateur
    const validPassword = await user.validPassword(
      req.body.password,
      user.password
    );

    // Si le mot de passe n'est pas valide, lance une erreur d'authentification
    if (!validPassword) {
      const error = new Error("Invalid password");
      throw error;
    }

    // Génère un token JWT en cas de succès de l'authentification
    const token = jwt.sign({ id: user.id }, "simplon-secret", {
      expiresIn: "1d",
    });

    // Renvoie l'utilisateur et un message de succès en réponse JSON
    res.json({ user, token, message: "Vous êtes connecté" });
  } catch (error) {
    // Gère les erreurs en affichant le message d'erreur dans la console
    console.error(error.message);
  }
};

// Exporte les fonctions store et login pour les utiliser dans d'autres fichiers
module.exports = { store, login };
