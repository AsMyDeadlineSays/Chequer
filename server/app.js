const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pythonShell = require('python-shell')


const setup = require('./setup/index')
const config = require('./config')

const parse_script = 'parse_html.py'

setup().then(() => {
    console.log('listening on port:', config.appPort)
    app.listen(config.appPort)
})

const familySchema = require('./schema_family.js')
var Family = familySchema.Family

const app = express()
const root = __dirname + '/../'
const static_dir = path.join(root, 'dist', 'static')

app.use('/static/', express.static(static_dir));
app.use(bodyParser.json())

app.get('/user-list', function(req, res){
  console.log('/user-list')
  Family.find({}, function(err, users) {
        res.send(users.reduce(function(userMap, item) {
            userMap[item.id] = item;
            return userMap;
        }, {}));
    });
  console.log('end')
})

//DEBUG
app.get('/api/family/', function(req, res){
  console.log('/api/family/')
  var newFamily = new Family({history: null})
  res.send('new family ' + newFamily.id)
  newFamily.save(function(err){
    if(err) console.log('Error while creating a user')
  })
  console.log('end')
})

app.put('/api/family/', function(req, res){
  var newFamily = new Family({history: null})
  newFamily.save(function(err){
    if(err) console.log('Error while creating a user')
  })
})

app.post('/api/family/merge', function(req, res){
  
})

app.get('/api/parse-receipt', function(req, res){
  console.log('/api/parse-receipt')
  pythonShell.run(parse_script, function(err, results) {
    if(err) throw error
    res.send('result: '+results)
  })

  if(req.body.query){
    url = 'http://receipt.taxcom.ru/v01/show?' +req.body.query
    pythonShell.run(parse_script, {args: [url]}, function(err, results) {
      if(err) throw error
      res.send('result: '+results)
    })
  } else {
    console.log('no body.query');
  }

  console.log('end')
})

app.get('*', function (req, res) {
  console.log('*')
  res.sendFile(root + '/static/index.html');
});
