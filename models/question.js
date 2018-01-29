const questionService = require('../dbServices/questionService')

exports.all = () => {
  return questionService.all();
}


exports.getByQuizId = (quizId) => {
  return questionService.getByQuizId(quizId);
}

exports.getById = (id) => {
  return questionService.getById(id);
}

exports.create = (docs) => {
  return questionService.create(docs);
}


