const mongoDB = require('../helpers/db')
exports.all = () => {
  return new Promise((resolve, reject) => {
    const quizzes = mongoDB.db.collection("quizzes");
    quizzes.find({}).toArray(function (err, result) {      
      if (err)
        reject(err);
      else
        resolve(result);
    });
  })
}

exports.get = function (id, cb) {
  cb(null, { id: id, text: 'Very nice example' })
}

