const User = require("../models/User");

// CREATE USER (REGISTER)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    // ✅ VALIDATION (must be BEFORE using variables)
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // ✅ OPTIONAL: restrict role assignment
    // if no JWT yet → allow default role
    let newRole = role || "viewer";

    // If you still want header-based control (optional)
    if (req.headers.role && req.headers.role !== "admin") {
      newRole = "viewer";
    }

    const user = new User({
      name,
      email,
      password, // 🔥 will be hashed automatically (pre-save hook)
      role: newRole,
      status,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user,
    });



  } catch (error) {

    // 🔥 Duplicate email handling
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({ error: error.message });
  }
};



// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // 🔥 hide password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};