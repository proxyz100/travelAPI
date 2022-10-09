const Type = require("../models/types.model");

// CRUD endpoints
async function getTypes(req, res) {
  const types = await Type.findAll();
  res.status(200).json(types);
}

async function createType(req, res) {
  const body = req.body;
  const numsTypes = (await Type.findAll()).length;
  if (numsTypes >= 3) return res.status(400).json({ error: "You cannot have more than three types (Max. 3 types)" });
  const type = await Type.create(body);
  res.status(201).json(type);
}

async function updateType(req, res) {
  const id = req.params.id;
  const type = req.body;
  await Type.update(type, { where: { id } });
  const type_updated = await Type.findByPk(id);
  res.status(200).json(type_updated);
}

async function deleteType(req, res) {
  const id = req.params.id;
  const deleted = await Type.destroy({ where: { id } });
  res.status(200).json(deleted);
}

module.exports = { getTypes, createType, updateType, deleteType };
