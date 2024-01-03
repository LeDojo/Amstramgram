// Importation du modèle de Post depuis le fichier postModel.js
const Post = require("../models/postModel");

// Récupère tous les posts existants dans la base de données
const getAllPosts = async (req, res) => {
  try {
    // Utilise la méthode find() de Mongoose pour récupérer tous les posts
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    // Gère les erreurs en renvoyant un objet JSON avec un message d'erreur
    res.json({ error: error.message });
  }
};

// Crée un nouveau post avec la description et l'image fournies dans le corps de la requête
const createPost = async (req, res) => {
  const { description } = req.body;
  try {
    // Utilise la méthode create() de Mongoose pour créer un nouveau post
    const newPost = await Post.create({
      description,
      image: req.file ? req.file.path : null,
    });
    console.log(newPost);
    res.json({ newPost, message: "Successfully created" });
  } catch (error) {
    // Gère les erreurs en renvoyant un objet JSON avec un message d'erreur
    res.json({ error: error.message });
  }
};

// Affiche un post spécifique en fonction de l'ID fourni dans les paramètres de la requête
const showPost = async (req, res) => {
  try {
    // Utilise la méthode findById() de Mongoose pour trouver un post par son ID
    const post = await Post.findById(req.params.id);
    res.json({ post });
  } catch (error) {
    // Gère les erreurs en renvoyant un objet JSON avec un message d'erreur
    res.json({ error: error.message });
  }
};

// Met à jour un post spécifique en fonction de l'ID fourni dans les paramètres de la requête
const updatePost = async (req, res) => {
  try {
    // Utilise findOneAndUpdate() de Mongoose pour trouver et mettre à jour un post
    const changePost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      req.body, // Utilise le corps de la requête pour mettre à jour les champs du post
      { new: true } // Renvoie le nouveau post mis à jour
    );
    res.json({ changePost, message: "Successfully update post" });
  } catch (error) {
    // Gère les erreurs en renvoyant un objet JSON avec un message d'erreur
    res.json({ error: error.message });
  }
};

// Supprime un post spécifique en fonction de l'ID fourni dans les paramètres de la requête
const deletePost = async (req, res) => {
  try {
    // Utilise findOneAndDelete() de Mongoose pour trouver et supprimer un post
    const removePost = await Post.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Successfully delete post" });
  } catch (error) {
    // Gère les erreurs en renvoyant un objet JSON avec un message d'erreur
    res.json({ error: error.message });
  }
};

// Exporte toutes les fonctions pour les utiliser dans d'autres fichiers
module.exports = { getAllPosts, createPost, showPost, updatePost, deletePost };
