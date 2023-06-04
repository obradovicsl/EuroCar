let admins = require('../data/admins.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(admins);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const admin = admins.find(c => c.id == id)
    resolve(admin);
  })
}

const create = function(admin){
  return new Promise((resolve, reject) => {
    const newAdmin = {id: uuidv4(), ...admin}
    admins.push(newAdmin)
    writeDataToFile('./data/admins.json', admins);
    resolve(newAdmin)
  })
}

const checkValidity = function(params){
  const {username, password} = params;

  return new Promise((resolve, reject) => {
    admins.forEach(admin => {
      if(admin.username == username && admin.password == password){
        resolve(admin);
      }
    });
    resolve(null);
  })
}

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const admin = admins.find(c => c.id == id)
    if(!admin) reject({message: 'admin does not exist!'});
    let newAdmin = {...admin};

    for (const [key, value] of Object.entries(body)) {
      newAdmin[key] = value;
    }

    admins = admins.filter(admin => {
     return admin.id != newAdmin.id
    });
    admins.push(newAdmin);
    writeDataToFile('./data/admins.json', admins);
    resolve(newAdmin);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  findByIdAndUpdate,
  checkValidity
}

