import express from "express";
import dotenv from "dotenv";
import mongo from "./utility/mongo.js";
import userRouter from "./user/user.route.js";
import redis from "./utility/redis.config.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
mongo();
redis();

app.use("/user", userRouter);
app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
