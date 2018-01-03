const ApiError = require ('../helpers/apiError')
const express = require('express')
  , router = express.Router()

router.use('/quizzes', require('./quizzes'))

router.use((err, req, res, next) => {
  // Expected errors always throw Error.
  // Unexpected errors will either throw unexpected stuff or crash the application.
  if (Object.prototype.isPrototypeOf.call(ApiError.prototype, err)) {
    return res.status(err.status).json({ error: err.message });
  }
  console.error('~~~ Unexpected error exception start ~~~');
  console.error(req);
  console.error(err);
  console.error('~~~ Unexpected error exception end ~~~');

  return res.status(500).json({ error: 'Unexpected Error' });
});

// router.get('/', function(req, res) {
//   res.json({ok: true});
// })

module.exports = router