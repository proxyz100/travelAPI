const Destination = require('../models/destinations.models');

function createDestination(req, res) {
    const body = req.body; 
    Destination.create(body).then(destination =>{
        res.status(201).json(destination);
    }); 
}

async function getDestination(req, res){
    const id = req.params.id; 
    const destination = await Destination.findByPk(id); 
    res.status(200).json(destination); 
}

async function getDestinations(req, res){
    const destinations = await Destination.findAll(); 
    res.status(200).json(destinations);
}

async function updateDestination(req, res){
    const id = req.params.id; 
    const destination = req.body; 
    await Destination.update(destination, {where: {id}}); 
    const destination_updated = await Destination.findByPk(id); 
    res.status(200).json(destination_updated); 
}

async function deleteDestination(req, res){
     const id= req.params.id; 
     const deleted = Destination.destroy(
        {where: {id}}
     ); 
     req.status(200).json(deleted); 
}

module.exports = {
    createDestination,
    getDestination, 
    getDestinations, 
    updateDestination,
    deleteDestination, 
}