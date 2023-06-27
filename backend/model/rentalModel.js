let rentals = require('../data/rentals.json');
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

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const rental = rentals.find(c => c.id == id)
    if(!rental) reject({message: 'rental does not exist!'});
    let newRental = {...rental};

    for (const [key, value] of Object.entries(body)) {
      newRental[key] = value;
    }

    rentals = rentals.filter(rental => {
     return rental.id != newRental.id
    });
    rentals.push(newRental);
    writeDataToFile('./data/rentals.json', rentals);
    resolve(newRental);
  });
}

module.exports = {
  findAll,
  findById,
  findByIdAndUpdate,
  create
}

