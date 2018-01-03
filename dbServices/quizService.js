const mongoDB = require('../helpers/db')

exports.all = () => {     
      const quizzes = mongoDB.db.collection("quizzes");
      return quizzes.find({}).toArray()
  }

exports.getById = (o_id) => {     
    const quizzes = mongoDB.db.collection("quizzes");
    return quizzes.find({ObjectId(...o_id)})
}