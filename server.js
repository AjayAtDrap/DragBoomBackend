import express from "express";
import dotenv from "dotenv";
import userModel from "./user/user.model.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.get("/", async (req, res) => {
  const data = new userModel({
    name: "ajay",
    email: "aja@gmail.com",
    password: "1234",
    dob: "2002-12-09",
  });
  data.save();
  res.send(data);
});

app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
