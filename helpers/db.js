const config = require('../config')
const isMockDB = config.database.mongoMock;
const mongoDb = isMockDB ? require('mongo-mock'):require('mongodb')
const mongoClient = mongoDb.MongoClient;

class DbClient {
    constructor() {
        this._db = null
    }

    connect() {
        if (this._db !== null)
            return new Promise((resolve, reject) => {
                resolve();
            })
        return new Promise((resolve, reject) => {            
            if(isMockDB){                
                mongoClient.persist="mongo.js";
            }   

            mongoClient.connect(config.database.url, (err, client) => {                
                if (err) {
                    reject(err);
                    return;
                }               
                this._db = isMockDB ? client:client.db(config.database.dbName);
                resolve();
            });
        })
    }

    get db(){
        return this._db;
    }

    get mongoDB(){
        return mongoDb;
    }
}

const databaseService = new DbClient();
module.exports = databaseService;

