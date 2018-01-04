const ObjectId = require('mongodb').ObjectId; 

exports.stringToObjectId = (id) => {
    return new ObjectId(id);
}

