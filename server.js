const dataBaseService = require('./helpers/db')
const logger = require('./log')
const config = require('./config')


const express = require('express')
  , app = express()
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , winston = require('winston')
  , port = process.env.PORT || 3001


const mainLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  mainLogger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
logger.log = mainLogger;

const httpLog = morgan(
  'combined',
  {
    "stream": {
      write: (str) => { mainLogger.info(str); }
    }
  });

app.use(httpLog)
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./controllers'))


dataBaseService.connect()
  .then(() => {
    app.listen(port,  () => {
      mainLogger.info('Listening on port ' + port)
    })
  })
  .catch((err => {
    mainLogger.error(err)
  }))

