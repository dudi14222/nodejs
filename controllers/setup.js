const controllerHandler = require('./controllerHandler')
const express = require('express')
    , router = express.Router()
    , Setup = require('../models/setup')    

router.get('/', controllerHandler(Setup.init, (req, res, next) => [req.query.clear]))

module.exports = router