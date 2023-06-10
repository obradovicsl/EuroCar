let managers = require('../data/managers.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(managers);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const manager = managers.find(c => c.id == id)
    resolve(manager);
  })
}

const create = function(manager){
  return new Promise((resolve, reject) => {
    const newManager = {id: uuidv4(), ...manager}
    managers.push(newManager)
    writeDataToFile('./data/managers.json', managers);
    resolve(newManager)
  })
}

const checkValidity = function(params){
  const {username, password} = params;

  return new Promise((resolve, reject) => {
    managers.forEach(manager => {
      if(manager.username == username && manager.password == password){
        resolve(manager);
      }
    });
    resolve(null);
  })
}

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const manager = managers.find(c => c.id == id)
    if(!manager) reject({message: 'manager does not exist!'});

    let newManager = {...manager};

    for (const [key, value] of Object.entries(body)) {
      newManager[key] = value;
    }
    managers = managers.filter(manager => {
     return manager.id != newManager.id
    });
    managers.push(newManager);
    writeDataToFile('./data/managers.json', managers);
    resolve(newManager);
  });
}


module.exports = {
  findAll,
  findById,
  create,
  findByIdAndUpdate,
  checkValidity
}

