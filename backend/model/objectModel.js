let objects = require('../data/rentCarObjects.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(objects);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const object = objects.find(c => c.id == id)
    resolve(object);
  })
}

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const object = objects.find(c => c.id == id)
    if(!object) reject({message: 'object does not exist!'});
    let newObject = {...object};

    for (const [key, value] of Object.entries(body)) {
      newObject[key] = value;
    }

    objects = objects.filter(object => {
     return object.id != newObject.id
    });

    objects.push(newObject);
    writeDataToFile('./data/rentCarObjects.json', objects);
    resolve(newObject);
  });
}

const removeVehicle = function(id, vehId){

  return new Promise((resolve, reject) => {
    const object = objects.find(c => c.id == id)
    if(!object) reject({message: 'object does not exist! (removing vehicle)'});
   
    object.vehiclesIds = object.vehiclesIds.filter(id => id != vehId);

    objects = objects.filter(obj => {
     return obj.id != object.id
    });

    objects.push(object);
    writeDataToFile('./data/rentCarObjects.json', objects);
    resolve(object);
  });
}

const create = function(object){
  return new Promise((resolve, reject) => {
    const newObject = {id: uuidv4(), ...object}
    objects.push(newObject)
    writeDataToFile('./data/rentCarObjects.json', objects);
    resolve(newObject)
  })
}

module.exports = {
  findAll,
  findById,
  findByIdAndUpdate,
  create,
  removeVehicle
}

