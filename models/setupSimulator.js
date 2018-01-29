const ApiError = require('../helpers/apiError')
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./sampleData/data.json', 'utf8'));
const dbSimulator = require('../dbServices/dbSimulator')

const quizSimulator = require('./quizSimulator')
const questionSimulator = require('./questionSimulator')
let isInitStart = false;



initDBData = () => {
  return new Promise((resolve, reject) => {
    try {
      if (!dbSimulator.isEmpty()) {
        resolve('there aren\'t new quizzes to insert')
        return;
      }
      const quizzesFromJson = jsonData.map(data => {
        return data.quiz;
      })
      quizSimulator.create(quizzesFromJson)
      for (let quizData of jsonData) {
        if (quizData.questions) {
          questionSimulator.create(quizData.questions);          
        }
      }
      resolve();
    }
    catch (e) {
      reject(e);
    }
  }
  )
}

exports.init = () => {
  return new Promise((resolve, reject) => {
    if (isInitStart) {
      reject('setup already started')
      return;
    }
    isInitStart = true;
    initDBData()
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error)
      })
      .then(() => {
        isInitStart = false;
      })
  })
}



