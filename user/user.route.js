import express from "express";
import { redisMiddleware } from "../utility/reddis.middle.js";
import {
  alluser,
  deleteUser,
  getUser,
  postUser,
  putUser,
} from "./user.controller.js";
const router = express.Router();

router.get("/users", redisMiddleware, alluser);
router.get("/:id", redisMiddleware, getUser);
router.delete("/:id", deleteUser);
router.put("/:id", putUser);
router.post("/addUser", postUser);

export default router;
