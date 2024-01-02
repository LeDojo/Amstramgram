const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    // Chaque poste aura un utilisateur émétteur
  user: {type: Schema.Types.ObjectId, ref:"User"},
  description: String,
  image: String,
    //Chaque poste aura une date de création, qui aura pour référence la date de maintenant
  createAt: {type:Date, default:Date.now()}}
);



const Post = mongoose.model("Post", postSchema);




module.exports = Post;