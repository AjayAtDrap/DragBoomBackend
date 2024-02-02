import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
const router = express.Router();
const app = express();

//   try {
//     await client.connect();
//     console.log("Redis is Connected");
//   } catch (err) {
//     console.log("Error at coonecting at redis", err);
//   }
// };
// redis();
// // const redisMiddleware = async (req, res, next) => {
// //   try {
// //     const { method, originalUrl } = req;
// //     const key = `${method}:${originalUrl}`;
// //     const cachedData = await client.get(key);

// //     if (cachedData) {
// //       res.json(JSON.parse(cachedData));
// //       console.log(cachedData);
// //       return;
// //     }
// //     next();
// //   } catch (error) {
// //     console.error("Redis caching middleware error:", error);
// //     next();
// //   }
// // };

// app.use("/users", redisMiddleware);

router.get("/users", async (req, res) => {
  try {
    const alluser = await userModel.find();
    res.status(200).send(alluser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const saltRounds = 10;
    const { name, email, username, password, dob } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = new userModel({
      name,
      email,
      dob,
      username,
      password: hashedPassword,
    });
    await userData.save();
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await userModel.findById(id);
    res.status(201).json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(201).json("Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const upData = await userModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(upData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
