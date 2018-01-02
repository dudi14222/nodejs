const MongoClient = require('mongodb').MongoClient;
const mongoDB = require('./helpers/db')
const config = require('./config')

const express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 3001

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./controllers'))


MongoClient.connect(config.database.url, function (err, client) {
  if (err) {
    console.error(err) // exit ?
  }
  mongoDB.db = client.db(config.database.dbName);
  app.listen(port, function () {
    console.log('Listening on port ' + port)
  })
});

