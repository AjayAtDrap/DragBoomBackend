import express from "express";
import dotenv from "dotenv";
import mongo from "./utility/mongo.js";
import userRouter from "./user/user.route.js";
import redis from "./utility/redis.config.js";
import cors from "cors";
import pageRouter from "./pages/pages.route.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.options("*", cors());
const port = process.env.PORT;
app.use(express.json());
mongo();
redis();

app.use("/user", userRouter);
app.use("/page", pageRouter);
app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
