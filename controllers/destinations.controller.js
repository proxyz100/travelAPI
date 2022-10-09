const Destination = require('../models/destinations.model');
const Category = require('../models/categories.model');

function createDestination(req, res) {
    const body = req.body;
    Destination.create(body).then(destination => {
        res.status(201).json(destination);
    });
}

async function getDestination(req, res) {
    const id = req.params.id;
    const destination = await Destination.findByPk(id);
    res.status(200).json(destination);
}

async function getDestinations(req, res) {
    const limit = req.query.limit;
    const categoryId = req.query.category;

    const allDestinations = await Destination.findAll();
    if (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(400).json({ destinations: null });
        const filterDestinations = allDestinations.filter(destination => destination.CategoryId === Number(categoryId));
        console.log(filterDestinations);
        const destinations = filterDestinations.slice(0, limit ?? filterDestinations.length);
        return res.status(200).json(destinations);
    }
    const destinations = allDestinations.slice(0, limit ?? allDestinations.length);
    res.status(200).json(destinations);
}

async function updateDestination(req, res) {
    const id = req.params.id;
    const destination = req.body;
    await Destination.update(destination, { where: { id } });
    const destination_updated = await Destination.findByPk(id);
    res.status(200).json(destination_updated);
}

async function deleteDestination(req, res) {
    const id = req.params.id;
    const deleted = await Destination.destroy(
        { where: { id } }
    );
    res.status(200).json(deleted);
}

module.exports = {
    createDestination,
    getDestination,
    getDestinations,
    updateDestination,
    deleteDestination,
}
