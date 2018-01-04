const ApiError = require('../helpers/apiError')
const mongoDB = require('../helpers/db')
const dbUtils = require('../helpers/dbUtils')

exports.all = (collectionName) => {
    const collection = mongoDB.db.collection(collectionName);
    return collection.find({}).toArray()
}

exports.getById = (collectionName, id) => {
    const collection = mongoDB.db.collection(collectionName);
    return new Promise(function (resolve, reject) {
        collection.findOne({ _id: dbUtils.stringToObjectId(id) }, (err, doc) => {
            if(err){
                reject(err);
            }
            else{
                if(doc === null){
                    reject(new ApiError('The server can not find requested resource', 404));
                }
                else{
                    resolve(doc);
                }             
            }
        });
    })
}