const mongoService = require('./mongoService')
const collection = "quizzes";

exports.all = () => {
    return mongoService.findAll(collection);    
}

exports.getById = (id) => {
    return mongoService.getById(collection, id);    
}