const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { validateUser } = require("../middleware/validation");

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// CREATE USER (public)
router.post("/", validateUser, createUser);

// GET USERS (all roles)
router.get("/", authMiddleware(["admin", "analyst", "viewer"]), getUsers);

// UPDATE USER (admin only)
router.put("/:id", authMiddleware(["admin"]), updateUser);

// DELETE USER (admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteUser);

module.exports = router;