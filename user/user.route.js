import express from "express";
import { redisMiddleware } from "../utility/reddis.middle.js";
import {
  alluser,
  deleteUser,
  getUser,
  postUser,
  putUser,
  singleUser,
} from "./user.controller.js";
import { authenticateToken } from "../utility/utils.js";
const router = express.Router();

router.get("/users", redisMiddleware, alluser);
// router.get("/:id", redisMiddleware, getUser);
router.post("/login", redisMiddleware, getUser);
router.get("/getuser", authenticateToken, singleUser);
router.delete("/:id", deleteUser);
router.put("/:id", putUser);
router.post("/addUser", postUser);

export default router;
