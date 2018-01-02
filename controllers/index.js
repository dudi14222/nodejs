const express = require('express')
  , router = express.Router()

router.use('/quizzes', require('./quizzes'))
router.get('/', function(req, res) {
  res.json({ok: true});
})

module.exports = router