const vehicles = require('../data/vehicles.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(vehicles);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const vehicle = vehicles.find(c => c.id == id)
    resolve(vehicle);
  })
}

const create = function(vehicle){
  return new Promise((resolve, reject) => {
    const newVehicle = {id: uuidv4(), ...vehicle}
    vehicles.push(newVehicle)
    writeDataToFile('./data/vehicles.json', vehicles);
    resolve(newVehicle)
  })
}

module.exports = {
  findAll,
  findById,
  create,
}

