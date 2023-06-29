let vehicles = require('../data/vehicles.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    vehicles = vehicles.filter(veh => veh.active == true);
    resolve(vehicles);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const vehicle = vehicles.find(veh => veh.id == id & veh.active == true)
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

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const vehicle = vehicles.find(c => c.id == id && c?.deleted != true)
    if(!vehicle) reject({message: 'vehicle does not exist!'});
    let newVehicle = {...vehicle};

    for (const [key, value] of Object.entries(body)) {
      newVehicle[key] = value;
    }

    vehicles = vehicles.filter(vehicle => {
     return vehicle.id != newVehicle.id
    });

    vehicles.push(newVehicle);
    writeDataToFile('./data/vehicles.json', vehicles);
    resolve(newVehicle);
  });
}

const remove = function(id){

  return new Promise((resolve, reject) => {
    const vehicle = vehicles.find(c => c.id == id)
    if(!vehicle) reject({message: 'vehicle does not exist!'});
    vehicle.deleted = true;
    
    vehicles = vehicles.filter(veh => {
     return veh.id != vehicle.id
    });

    vehicles.push(vehicle);
    writeDataToFile('./data/vehicles.json', vehicles);
    resolve(vehicle);
  });
}

module.exports = {
  findAll,
  findById,
  findByIdAndUpdate,
  create,
  remove,
}

