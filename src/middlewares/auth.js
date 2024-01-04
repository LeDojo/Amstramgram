const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authenticate = async (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(" ");
  try {
    console.log(token);
    const decodeToken = jwt.verify(token[1], "simplon-secret");
    console.log(decodeToken.id);
    const user = await User.findOne({ _id: decodeToken.id });
    if (!user) {
      const error = new Error("User not found");
      throw error;
    }
    req.user = user.id;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authenticate;
