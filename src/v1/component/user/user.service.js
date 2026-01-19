const User = require("../../../models/user.model");

exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");

  return { user };
};

exports.getAllUsers = async () => {
  const users = await User.find().select("-password");
  return { users };
};

exports.updateUserRole = async (userId, role) => {
  if (!["user", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select("-password");

  if (!user) throw new Error("User not found");

  return { message: "Role updated", user };
};

exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");

  return { message: "User deleted successfully" };
};