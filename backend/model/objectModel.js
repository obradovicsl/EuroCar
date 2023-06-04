const objects = require('../data/rentCarObjects.json');
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
  create
}

