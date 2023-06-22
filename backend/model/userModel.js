let users = require('../data/users.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(users);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const user = users.find(c => c.id == id)
    resolve(user);
  })
}

const create = function(user){
  return new Promise((resolve, reject) => {
    const newUser = {id: uuidv4(), ...user}
    users.push(newUser)
    writeDataToFile('./data/users.json', users);
    resolve(newUser)
  })
}

const checkValidity = function(params){
  const {username, password} = params;

  return new Promise((resolve, reject) => {
    users.forEach(user => {
      if(user.username == username && user.password == password){
        resolve(user);
      }
    });
    resolve(null);
  })
}

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const user = users.find(c => c.id == id)
    if(!user) reject({message: 'user does not exist!'});
    let newUser = {...user};

    for (const [key, value] of Object.entries(body)) {
      newUser[key] = value;
    }

    users = users.filter(user => {
     return user.id != newUser.id
    });
    users.push(newUser);
    writeDataToFile('./data/users.json', users);
    resolve(newUser);
  });
}

module.exports = {
  findAll,
  findById,
  create,
  findByIdAndUpdate,
  checkValidity
}

