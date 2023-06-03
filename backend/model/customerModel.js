const customers = require('../data/customers.json');
const catchAsync = require('../utils/catchAsync');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(customers);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const customer = customers.find(c => c.id == id)
    resolve(customer);
  })
}

const Create = function(customer){
  return new Promise((resolve, reject) => {
    const newCustomer = {id: uuidv4(), ...customer}
    customers.push(newCustomer)
    writeDataToFile('./data/customers.json', customers);
    resolve(newCustomer)
  })
}

module.exports = {
  findAll,
  findById,
  Create
}

