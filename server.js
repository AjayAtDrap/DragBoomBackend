import express from "express";
import dotenv from "dotenv";
import mongo from "./mongo.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
mongo();

app.use("/user", userRouter);
app.listen(port, () => {
  console.log(`server is running on ${port} port`);
});
