const mongoService = require('./mongoService')
const collection = "quizzes";

exports.all = () => {
    return mongoService.all(collection);    
}

exports.getById = (id) => {
    return mongoService.getById(collection, id);    
}