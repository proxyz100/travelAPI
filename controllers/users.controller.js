const User = require("../models/users");

// TO DO: Implement authorization and authentication
async function signUp(req, res) {
  const body = req.body;

  try {
    const user = await User.create(body);
    const { salt, hash } = User.createPassword(body["password"]);
    user.password_salt = salt;
    user.password_hash = hash;
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (
      ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
        err.name
      )
    ) {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    } else {
      throw err;
    }
  }
}

// TO DO: Implement method
function logIn(req, res) {}

// CRUD endpoints
async function getUsers(req, res) {
  const users = await User.findAll();
  res.status(200).json(users);
}

async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findByPk(id);
  res.status(200).json(user);
}

async function createUser(req, res) {
  const body = req.body;
  const user = await User.create(body);
  res.status(201).json(user);
}

async function updateUser(req, res) {
  const id = req.params.id;
  const user = req.body;
  await User.update(user, { where: { id } });
  const user_updated = await User.findByPk(id);
  res.status(200).json(user_updated);
}

async function deleteUser(req, res) {
  const id = req.params.id;
  const deleted = User.destroy({ where: { id } });
  res.status(200).json(deleted);
}

module.exports = {
  signUp,
  logIn,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
