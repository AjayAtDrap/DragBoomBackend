import userModel from "../models/user.model.js";
import { client } from "../redis.config.js";
import bcrypt from "bcrypt";

export const alluser = async (req, res) => {
  try {
    const { method, originalUrl } = req;
    const key = `${method}:${originalUrl}`;
    const alluser = await userModel.find();
    console.log(method, originalUrl);
    await client.set(key, JSON.stringify(alluser));
    client.expire(key, 10);
    console.log("data from DB", alluser);
    res.status(200).json(alluser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { method, originalUrl } = req;
    const key = `${method}:${originalUrl}`;
    console.log(method, originalUrl);
    const userData = await userModel.findById(id);
    await client.set(key, JSON.stringify(userData));
    client.expire(key, 10);
    console.log("data from DB", userData);
    res.status(201).json(userData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
    });
    await userData.save();
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};