const config = require('../config')
const isMockDB = config.database.mongoMock;
const controllerHandler = require('./controllerHandler')
const express = require('express')
    , router = express.Router()
    , Setup =  isMockDB? require('../models/setupSimulator'):require('../models/setup')    

router.get('/', controllerHandler(Setup.init, (req, res, next) => [req.query.clear]))

module.exports = router