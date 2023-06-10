const rentals = require('../data/rentals.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(rentals);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const rental = rentals.find(c => c.id == id)
    resolve(rental);
  })
}

const create = function(rental){
  return new Promise((resolve, reject) => {
    const newRental = {id: uuidv4(), ...rental}
    rentals.push(newRental)
    writeDataToFile('./data/rentals.json', rentals);
    resolve(newRental)
  })
}

module.exports = {
  findAll,
  findById,
  create
}

