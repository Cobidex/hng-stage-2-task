import { Router } from "express";
import getUserRecord from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/:id", authMiddleware, getUserRecord);

export default router;
