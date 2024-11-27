const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  status: { type: String, default: "Active" },
});

module.exports = mongoose.model("User", userSchema);
