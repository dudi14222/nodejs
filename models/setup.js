const ApiError = require('../helpers/apiError')
const fs = require('fs');
const quizzesJson = JSON.parse(fs.readFileSync('./sampleData/quizzes.json', 'utf8'));
const questionsJson = JSON.parse(fs.readFileSync('./sampleData/questions.json', 'utf8'));

const quizService = require('../dbServices/quizService')
const questionService = require('../dbServices/questionService')
let isInsertStart = false;

insertQuizId = (questions, id) => {
  return questions.map(q => {
    q['quiz_id'] = id;
    return q;
  })
}

getQuizIdByName = (quizzes, quizName) => {
  for (let quiz of quizzes) {
    if (quiz.name === quizName)
      return quiz._id.toJSON();
  }
  return null;
}

isQuizExist = (quizzes, name) => {
  for (let i = 0; i < quizzes.length; i++) {
    if (quizzes[i].name === name)
      return true;
  }
  return false;
}

isQuestionExist = (questions, questionText) => {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].questionText === questionText)
      return true;
  }
  return false;
}

exports.init = () => {
  return new Promise((resolve, reject) => {
    if (isInsertStart) {
      throw new ApiError('setup already started')
    }
    else {
      isInsertStart = true;
    }
    quizService.all()
      .then(quizzesFromDb => {
        const filteredQuizzes = quizzesJson.filter(q => !isQuizExist(quizzesFromDb, q.name));
        if(filteredQuizzes.length === 0){
          resolve('there aren\'t new quizzes to insert')
          return;
        }
        quizService.create(filteredQuizzes)
          .then(res => {
            const insertedArray = res.ops;
            questionService.all()
              .then(questionsFromDb => {
                let filteredQuestionsWithQuizId = [];
                for (let quiz of Object.keys(questionsJson)) {
                  let filteredQuestions = questionsJson[quiz].filter(q => !isQuestionExist(questionsFromDb, q.questionText));
                  filteredQuestionsWithQuizId.push(...insertQuizId(filteredQuestions, getQuizIdByName([...insertedArray, ...quizzesFromDb], quiz)));
                }

                questionService.create(filteredQuestionsWithQuizId)
                  .then(res => (
                    resolve(res)
                  ))
                  .catch(error => (
                    reject(error)
                  ))

              })
              .catch(error => (
                reject(error)
              ))
          })
          .catch(error => {
            reject(error);
          })
      })
      .catch(error => {
        reject(error);
      })
      .then(() => (
        isInsertStart = false
      ))
  })

}



