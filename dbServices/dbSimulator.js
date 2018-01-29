
class DbSimulator {
    constructor() {
        this.questions = [];
        this.quizzes = [];
    }

    insertMany(collectionName, docs){
        if(collectionName === 'questions'){
            this.questions = [...this.questions, ...docs]
        }
        else if(collectionName === 'quizzes'){
            this.quizzes = [...this.quizzes, ...docs]
        }
    }

    isEmpty(){
        return this.quizzes.length === 0;
    }

    findAll(collectionName){
        if(collectionName === 'questions'){
            return this.questions;
        }
        else if(collectionName === 'quizzes'){
            return this.quizzes;
        }
    }

    getQuestionsByQuizId(quizId){
        return this.questions.filter(q=>(q.quiz_id === quizId));
    }

    updateQuizResults(id, score){
        const quiz = this.quizzes.find(q=>{
            return q._id === id;
        })  
        let aggregatedScore = 0;  
        let gameCounter = 0;
        if(quiz.aggregatedScore){
            aggregatedScore = quiz.aggregatedScore;  
            gameCounter = quiz.gameCounter;              
        }        
        aggregatedScore += score;
        gameCounter++;
        quiz.aggregatedScore = aggregatedScore;
        quiz.gameCounter = gameCounter;
    }
}

const dbSimulator = new DbSimulator();
module.exports = dbSimulator;

