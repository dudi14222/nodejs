const ApiError = require ('../helpers/apiError')
const logger = require('../log');
const express = require('express')
  , router = express.Router()

router.use('/setup', require('./setup'))  
router.use('/quizzes', require('./quizzes'))
router.use('/questions', require('./questions'))


router.use((err, req, res, next) => {
  // Expected errors always throw Error.
  // Unexpected errors will either throw unexpected stuff or crash the application.
  if (Object.prototype.isPrototypeOf.call(ApiError.prototype, err)) {
    return res.status(err.status).json({ error: err.message });
  }
  logger.log.error(`Unexpected error exception: ${err}`);  
  return res.status(500).json({ error: 'Unexpected Error' });
});

module.exports = router