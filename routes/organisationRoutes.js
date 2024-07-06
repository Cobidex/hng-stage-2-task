const express = require("express");
const organisationController = require("../controllers/organisationController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", authMiddleware, organisationController.getUserOrganisations);
router.post("/", authMiddleware, organisationController.createOrganisation);
router.get("/:orgId", authMiddleware, organisationController.getOrganisation);
router.post("/:orgId/users", organisationController.addUserToOrganisation);

module.exports = router;
