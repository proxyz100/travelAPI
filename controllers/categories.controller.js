const Category = require('../models/categories.model');

function createCategory(req, res) {
    const body = req.body;
    Category.create(body).then(category => {
        res.status(201).json(category);
    });
}

async function getCategory(req, res) {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    res.status(200).json(category);
}

async function getCategories(req, res) {
    const limit = req.query.limit;
    const allCategories = await Category.findAll();
    const categories = allCategories.slice(0, limit ?? allCategories.length);
    res.status(200).json(categories);
}
async function updateCategory(req, res) {
    const id = req.params.id;
    const category = req.body;
    await Category.update(category, { where: { id } });
    const category_updated = await Category.findByPk(id);
    res.status(200).json(category_updated);
}
async function deleteCategory(req, res) {
    const id = req.params.id;
    const deleted = await Category.destroy(
        { where: { id } }
    );
    console.log(deleted);
    res.status(200).json(deleted);
}

module.exports = {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
}



