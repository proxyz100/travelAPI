const Destination = require('../models/destinations.model');

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
    const allDestinations = await Destination.findAll();
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
    const deleted = Destination.destroy(
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
