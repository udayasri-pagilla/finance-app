const express = require("express");
const router = express.Router();

const { getSummary } = require("../controllers/summaryController");
const authMiddleware = require("../middleware/authMiddleware");

// Analyst + Admin can access summary
router.get("/", authMiddleware(["admin", "viewer", "analyst"]), getSummary);

module.exports = router;