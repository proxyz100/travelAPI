const User = require("../models/users.model");

// TO DO: Implement authorization
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

async function logIn(req, res) {
  const body = req.body;
  const user = await User.findOne({ where: { email: body["email"] } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (
    User.validatePassword(
      body["password"],
      user.password_salt,
      user.password_hash
    )
  ) {
    return res.status(200).json({
      username: user.name + user.surname,
      email: user.email,
      token: User.generateJWT(user),
    });
  } else {
    return res.status(400).json({ mensaje: "Incorrect password" });
  }
}

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
  signUp(req, res);
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
