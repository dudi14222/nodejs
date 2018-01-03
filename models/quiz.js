const quizService = require('../dbServices/quizService')

exports.all = () => {
  return quizService.all();
}

exports.getById = (id) => {
  return quizService.getById(id);
}

