const taskService = require("./task.service");

exports.createTask = async (req, res) => {
  try {
    const result = await taskService.createTask(req.user.id, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const result = await taskService.getTasks(req.user, req.query);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const result = await taskService.getTaskById(req.user, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const result = await taskService.updateTask(req.user, req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.user, req.params.id);
    res.json(result);
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const result = await taskService.getTaskStats(req.user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
