const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Fetch all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// Delete user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Update user
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Error updating user", error });
    }
  });
  

module.exports = router;
