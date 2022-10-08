const User = require("../models/users.model");
const Type = require('../models/types.model');

async function getTypeId(nameType) {
  const typeUser = await Type.findOne({ where: { name: nameType } });
  return typeUser.id;
}

// SignUp function
async function signUp(req, res) {
  const body = req.body;

  try {
    // Validate the type of user admin
    const idAdmin = await getTypeId('Admin');
    if (body.TypeId === idAdmin) throw new Error('UserType Error');


    // Create the user
    const user = await User.create(body);
    const { salt, hash } = User.createPassword(body["password"]);
    user.password_salt = salt;
    user.password_hash = hash;

    // Validate the type user null
    if (!user.TypeId) {
      const idTypeUserBasic = await getTypeId('Basic');
      user.TypeId = idTypeUserBasic;
    }

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err.name);
    if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name)) {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    }
    else if (err.message === 'UserType Error') {
      return res.status(400).json({ err: err.message });
    }
    else {
      throw err;
    }
  }
}

// Login function
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
