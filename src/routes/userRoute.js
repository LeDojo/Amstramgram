const { store, login } = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/inscription", store);
userRouter.post("/connexion", login);

module.exports = userRouter;
