const express = require("express");
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/:id", authMiddleware, userController.getUserRecord);

module.exports = router;
