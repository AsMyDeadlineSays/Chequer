const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pythonShell = require('python-shell')
const util = require('util')
const bash = util.promisify(require('child_process').exec)


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
const root = path.resolve(__dirname, '..')
const static_dir = path.join(root, 'dist', 'static')

app.use('/static/', express.static(static_dir));
app.use(bodyParser.json())

app.get('/user-list', async function(req, res){
  console.log('/user-list')
  const users = await Family.find({})
  res.send(users.reduce(function(userMap, item) {
      userMap[item.id] = item;
      return userMap;
  }, {}))
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
  res.send({id: newFamily.id})
})

//post
app.get('/api/family/merge', async function(req, res){ //req.body.from (and not now) req.body.to
  console.log('/api/family/merge')
  if(req.body.from /*&& req.body.to*/){
    Family.find({id: req.body.from}).remove().exec()
    res.send('deleted '+req.body.from)
    //const to = await Family.find({id: req.body.to})
  }
  console.log('end')
})

app.post('/api/parse-receipt', function(req, res){ //req.body.family, req.body.query
  console.log('/api/parse-receipt')
  /*
  pythonShell.run(parse_script, function(err, results) {
    if(err) throw error
    res.send('result: '+results)
  })
  */
  //console.log(req.body.query);
  if(req.body.query && req.body.family){
    url = 'http://receipt.taxcom.ru/v01/show?' +req.body.query
    history = null
    async function pythonScript(){
      const {stdout, stderr} = await bash("python3 parse_html.py --url '"+url+"'")
      history = JSON.parse(stdout)
    }
    pythonScript()
    const family = Family.find({id:req.body.family})
    for(var i = 0; i < family.length; i++){
      family.history.push({value: history.value, amount: history.amount, price: history.price})
    }
    family.save(function(err){
      if(err) console.log(err);
    })
  } else {
    console.log('no body.query or body.family');
  }

  console.log('end')
})

app.get('*', function (req, res) {
  console.log('*')
  console.log(root)
  res.sendFile(path.join(root, 'dist/index.html'));
});
