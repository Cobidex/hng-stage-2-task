import { Router } from "express";
import {
  getUserOrganisations,
  createOrganisation,
  getOrganisation,
  addUserToOrganisation,
} from "../controllers/organisationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getUserOrganisations);
router.post("/", authMiddleware, createOrganisation);
router.get("/:orgId", authMiddleware, getOrganisation);
router.post("/:orgId/users", addUserToOrganisation);

export default router;
