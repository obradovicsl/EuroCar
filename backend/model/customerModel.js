let customers = require('../data/customers.json');
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

const create = function(customer){
  return new Promise((resolve, reject) => {
    const newCustomer = {id: uuidv4(), ...customer}
    customers.push(newCustomer)
    writeDataToFile('./data/customers.json', customers);
    resolve(newCustomer)
  })
}

const checkValidity = function(params){
  const {username, password} = params;

  return new Promise((resolve, reject) => {
    customers.forEach(customer => {
      if(customer.username == username && customer.password == password){
        resolve(customer);
      }
    });
    resolve(null);
  })
}

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const customer = customers.find(c => c.id == id)
    if(!customer) reject({message: 'customer does not exist!'});
    let newCustomer = {...customer};

    for (const [key, value] of Object.entries(body)) {
      newCustomer[key] = value;
    }

    customers = customers.filter(customer => {
     return customer.id != newCustomer.id
    });
    customers.push(newCustomer);
    writeDataToFile('./data/customers.json', customers);
    resolve(newCustomer);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  findByIdAndUpdate,
  checkValidity
}

