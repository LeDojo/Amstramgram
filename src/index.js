const express = require("express");
const userRouter = require("./routes/userRoute");

const app = express();
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoute");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/AmstramgramDB");
  console.log(`🦁 DATABASE CONNECTED 🦁`);
}

const port = 4567;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(port, () => console.log(` Server is listening on port : ${port}`));
