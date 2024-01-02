const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const store = async (req, res) => {
  try {
    const user = new User();
    user.email = req.body.email;
    user.password = await user.encryptPassword(req.body.password);
    user.save();
    const token = jwt.sign({id:user.id}, "simplon-secret", {expiresIn: "1d"});
    res.json({user,token});
  } catch (error) {
    console.error(error.message);
  }
};

const login = async (req, res) => {
  email = req.body.email;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Invalid");
      throw error;
    }

    const validPassword = await user.validPassword(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      const error = new Error("Invalid password");
      throw error;
    }
    const token = jwt.sign({id:user.id}, "simplon-secret", {expiresIn: "1d"});
    res.json({ user, message: "Vous êtes connécté" });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { store, login };
