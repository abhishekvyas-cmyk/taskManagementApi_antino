const express = require("express");
const router = express.Router();

const auth = require("../../../middleware/auth-handler");
const taskController = require("./task.controller");
const validate = require("../../../middleware/validate");
const { createTaskSchema, updateTaskSchema } = require("./task.validator");


// Create Task
router.post("/",validate(createTaskSchema), auth, taskController.createTask);

// Get All Tasks
router.get("/", auth, taskController.getTasks);

// Get Single Task
router.get("/:id", auth, taskController.getTaskById);

// Update Task
router.put("/:id", auth, taskController.updateTask);

// Delete Task
router.delete("/:id", auth, taskController.deleteTask);

// Statistics
router.get("/stats/all", auth, taskController.getTaskStats);

module.exports = router;
