const mongoDB = require('../helpers/db')
exports.all = function(cb) {
    const quizzes = mongoDB.db.collection("quizzes");
    quizzes.find({}).toArray(function (err, result) {      
      console.log(result);    
      cb(err, result)
    });

}

exports.get = function(id, cb) {
  cb(null, {id:id, text: 'Very nice example'})
}

