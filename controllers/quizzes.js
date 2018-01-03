const controllerHandler = require('./controllerHandler')
const express = require('express')
    , router = express.Router()
    , Quiz = require('../models/quiz')

router.get('/', controllerHandler(Quiz.all, (req, res, next) => []))

router.get('/:id', controllerHandler(Quiz.getById, (req, res, next) => [req.param._id]))

module.exports = router