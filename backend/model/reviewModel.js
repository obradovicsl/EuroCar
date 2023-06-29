let reviews = require('../data/reviews.json');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils/files')

const findAll = function(){
  return new Promise((resolve, reject) => {
    resolve(reviews);
  })
}

const findById = function(id){
  return new Promise((resolve, reject) => {
    const review = reviews.find(r => r.id == id)
    resolve(review);
  })
}

const findByObjectId = function(id){
  return new Promise((resolve, reject) => {
    const newReviews = reviews.filter(r => r.objectId == id)
    resolve(newReviews);
  })
}

const create = function(review){
  return new Promise((resolve, reject) => {
    const newReview = {id: uuidv4(), ...review}
    reviews.push(newReview)
    writeDataToFile('./data/reviews.json', reviews);
    resolve(newReview)
  })
}

const checkValidity = function(params){
  const {username, password} = params;

  return new Promise((resolve, reject) => {
    reviews.forEach(review => {
      if(review.username == username && review.password == password){
        resolve(review);
      }
    });
    resolve(null);
  })
}

const findByIdAndUpdate = function(id, body){

  return new Promise((resolve, reject) => {
    const review = reviews.find(c => c.id == id)
    if(!review) reject({message: 'review does not exist!'});
    let newReview = {...review};

    for (const [key, value] of Object.entries(body)) {
      newReview[key] = value;
    }

    reviews = reviews.filter(review => {
     return review.id != newReview.id
    });
    reviews.push(newReview);
    writeDataToFile('./data/reviews.json', reviews);
    resolve(newReview);
  });
}

module.exports = {
  findAll,
  findById,
  findByObjectId,
  create,
  findByIdAndUpdate,
  checkValidity
}

