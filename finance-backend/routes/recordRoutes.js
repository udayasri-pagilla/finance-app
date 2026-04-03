const express = require("express");
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");
const {
  validateCreateRecord,
  validateUpdateRecord,
} = require("../middleware/validation");

const authMiddleware = require("../middleware/authMiddleware");

// Admin → full access
router.post(
  "/",
  authMiddleware(["admin"]),
  validateCreateRecord,
  createRecord
);
router.put(
  "/:id",
  authMiddleware(["admin"]),
  validateUpdateRecord,
  updateRecord
);
router.delete("/:id", authMiddleware(["admin"]), deleteRecord);

// Analyst + Viewer → read
router.get("/", authMiddleware(["admin", "analyst", "viewer"]), getRecords);

module.exports = router;