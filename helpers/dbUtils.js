const ObjectId = require('mongodb').ObjectId; 

const parseParm = (...args) => {
    if(args.includes(_id)){
        args = args.map(param => {
            if(param === '_id')
                return {'_id': new ObjectId(param._id)};
            return param;    
        })
    }
    return args;
}