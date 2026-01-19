const userService = require("./user.service");

exports.getProfile = async (req, res) => {
  try {
    const result = await userService.getProfile(req.user.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const result = await userService.updateUserRole(req.params.id, req.body.role);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
