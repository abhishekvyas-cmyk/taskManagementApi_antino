const express = require("express");
const router = express.Router();

const userController = require("./user.controller");
const auth = require("../../../middleware/auth-handler");
const { isAdmin } = require("../../../middleware/is-admin");
const validate = require("../../../middleware/validate");
const { updateRoleSchema } = require("./user.validator");

// Get logged-in user's profile
router.get("/me", auth, userController.getProfile);

// Admin: Get all users
router.get("/", auth, isAdmin, userController.getAllUsers);

// Admin: Update user role
router.put("/:id/role",validate(updateRoleSchema), auth, isAdmin, userController.updateUserRole);

// Admin: Delete user
router.delete("/:id", auth, isAdmin, userController.deleteUser);

module.exports = router;
