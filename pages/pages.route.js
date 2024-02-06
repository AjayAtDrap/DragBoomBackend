import express from "express";
import { addPage } from "./pages.controller.js";
const router = express.Router();
router.post("/addPage", addPage);
export default router;
