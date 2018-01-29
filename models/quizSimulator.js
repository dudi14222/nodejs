const dbSimulator = require('../dbServices/dbSimulator')
const collection = "quizzes";
exports.all = () => {
  return new Promise((resolve, reject) => {    
    resolve(dbSimulator.findAll(collection));
  }) 
}

exports.getById = (id) => {
  return new Promise((resolve, reject) => {    
    reject('operation not supported');
  }) 
}

exports.updateQuizResults = (id, score) => {
  return new Promise((resolve, reject) => {    
    resolve(dbSimulator.updateQuizResults(id, score));
  })
}

exports.create = (docs) => {
  return new Promise((resolve, reject) => {    
    resolve(dbSimulator.insertMany(collection, docs));
  }) 
}


