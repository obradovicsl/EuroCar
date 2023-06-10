const locations = require('../data/locations.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(locations);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const location = locations.find(c => c.id == id)
    resolve(location);
  })
}

const create = function(location){
  return new Promise((resolve, reject) => {
    const newLocation = {id: uuidv4(), ...location}
    locations.push(newLocation)
    writeDataToFile('./data/locations.json', locations);
    resolve(newLocation)
  })
}

module.exports = {
  findAll,
  findById,
  create
}

