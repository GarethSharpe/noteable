// server.js

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 8000;

app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

MongoClient.connect(db.url, (error, database) => {
  if (error) return console.log(error);

  const db = database.db('noteable');
  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log('Listening on localhost:' + port);
  });               
})