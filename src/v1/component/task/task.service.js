const Task = require("../../../models/task.model");

// CREATE TASK
exports.createTask = async (userId, data) => {
  const task = await Task.create({
    ...data,
    createdBy: userId,
  });

  return { message: "Task created", task };
};

// GET ALL TASKS
exports.getTasks = async (user, query) => {
  const { status, priority, search } = query;

  let filter = {};

  if (user.role !== "admin") {
    filter.createdBy = user.id;
  }

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const tasks = await Task.find(filter).populate("createdBy assignee", "name email");
  return tasks;
};

// GET SINGLE TASK
exports.getTaskById = async (user, taskId) => {
  const task = await Task.findById(taskId);

  if (!task) throw new Error("Task not found");

  if (
    user.role !== "admin" &&
    user.id !== task.createdBy.toString() &&
    user.id !== task.assignee?.toString()
  ) {
    throw new Error("Not authorized");
  }

  return task;
};

// UPDATE TASK
exports.updateTask = async (user, taskId, body) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  const isCreator = task.createdBy.toString() === user.id;
  const isAssignee = task.assignee?.toString() === user.id;
  const isAdmin = user.role === "admin";

  if (!isCreator && !isAssignee && !isAdmin) {
    throw new Error("Not authorized");
  }

  // Assignee allowed to update only status
  if (isAssignee && !isCreator && !isAdmin) {
    if (!body.status) throw new Error("Assignee can update only status");
    task.status = body.status;
    await task.save();
    return task;
  }

  // Creator/Admin: full update
  Object.assign(task, body);
  await task.save();

  return task;
};

// DELETE TASK
exports.deleteTask = async (user, taskId) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  const isCreator = task.createdBy.toString() === user.id;
  const isAdmin = user.role === "admin";

  if (!isCreator && !isAdmin) {
    throw new Error("Not authorized");
  }

  await task.deleteOne();

  return { message: "Task deleted" };
};

// TASK STATISTICS
exports.getTaskStats = async (user) => {
  const filter = user.role === "admin" ? {} : { createdBy: user.id };

  const tasks = await Task.find(filter);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    byPriority: {
      low: tasks.filter((t) => t.priority === "low").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      high: tasks.filter((t) => t.priority === "high").length,
    },
  };

  return stats;
};