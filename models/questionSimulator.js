const dbSimulator = require('../dbServices/dbSimulator')
const collection = "questions";

exports.all = () => {
  return new Promise((resolve, reject) => {    
    resolve(dbSimulator.findAll(collection));
  }) 
}


exports.getByQuizId = (quizId) => {
  return new Promise((resolve, reject) => {    
    resolve(dbSimulator.getQuestionsByQuizId(quizId));
  })   
}

exports.getById = (id) => {
  return new Promise((resolve, reject) => {    
    reject('operation not supported');
  })
}

exports.create = (docs) => {
  return new Promise((resolve, reject) => {    
    resolve(dbSimulator.insertMany(collection, docs));
  }) 
}


