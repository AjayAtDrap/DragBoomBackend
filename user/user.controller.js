import userModel from "./user.model.js";
import { client } from "../utility/redis.config.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
export const alluser = async (req, res) => {
  try {
    const { method, originalUrl } = req;
    const key = `${method}:${originalUrl}`;

    const alluser = await userModel.find();

    await client.setEx(key, 10, JSON.stringify(alluser));

    console.log(method, originalUrl);
    console.log("Data from DB", alluser);

    res.status(200).json({ data: alluser, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { method, originalUrl } = req;
//     const key = `${method}:${originalUrl}`;
//     console.log(method, originalUrl);
//     const userData = await userModel.findById(id);
//     await client.set(key, JSON.stringify(userData));
//     client.expire(key, 50);
//     console.log("data from DB", userData);
//     res.status(201).json(userData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

export const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { method, originalUrl } = req;
    const key = `${method}:${originalUrl}`;

    console.log(method, originalUrl);

    const userData = await userModel.findOne({ username });

    if (!userData) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: userData._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    await client.setEx(key, 50, JSON.stringify(userData));

    console.log("Data from DB", userData);

    res.status(201).json({ userData, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(201).json("Deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
export const putUser = async (req, res) => {
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
};
export const postUser = async (req, res) => {
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
      uid: uuid(),
    });
    await userData.save();
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
