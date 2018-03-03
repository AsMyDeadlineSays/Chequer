//REQUIRES FOREIGN
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pythonShell = require('python-shell')
const util = require('util')
const bash = util.promisify(require('child_process').exec)
const fse = require('fs-extra')


//REQUIRES LOCAL
const setup = require('./setup/index')
const config = require('./config')


//GLOBAL VARs
const parse_script = 'parse_html.py'
const file_list = 'list.txt'

//INIT
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

const toBuySynchronize = async (familyId, list) => {
  const family = await Family.find({id:familyId})
  family.toBuy = list
  family.save((err) => {
    if(err) console.log(err)
  })
}

//ROUTING
//API
// /api/family/
// /api/family/merge
// /api/parse-receipt
// /api/to-buy
// *
app.get('/user-list', async (req, res) => {
  console.log('/user-list')
  const users = await Family.find({})
  console.log(users)
  res.send(users.reduce((userMap, item) => {
      userMap[item.id] = item;
      return userMap;
  }, {}))
  console.log('end')
})

//DEBUG
// app.get('/api/family/', (req, res) => {
//   console.log('/api/family/')
//   var newFamily = new Family({history: null})
//   res.send('new family ' + newFamily.id)
//   newFamily.save((err) => {
//     if(err) console.log('Error while creating a user')
//   })
//   console.log('end')
// })

app.put('/api/family/', (req, res) => {
  console.log('/api/family')
  var newFamily = new Family({history: null})
  newFamily.save((err) => {
    if(err) console.log('Error while creating a user')
  })
  res.send({id: newFamily.id})
  console.log('/api/family')
})

//post for production
//get for test
app.post('/api/family/merge', async (req, res) => { //req.body.from (and not now) req.body.to
  console.log('/api/family/merge')
  if(req.body.from /*&& req.body.to*/){
    Family.find({id: req.body.from}).remove().exec()
    res.send('deleted '+req.body.from)
    //const to = await Family.find({id: req.body.to})
  }
  console.log('end')
})

//TODO: TEST THIS SHIT
app.post('/api/parse-receipt', async (req, res) => { //req.body.family, req.body.query
  console.log('/api/parse-receipt')
  if(!req.body.query){
    console.log('no query')
    return;
  }
  if(!req.body.family){
    console.log('no family')
    return;
  }
  let family = undefined
  try{
    family = await Family.find({id:req.body.family})
  } catch(err){
      console.error('SHIT COMES NEXT')
      console.log(err)
  }
  const list = family.toBuy.map(x => x.value)
  var listForFile = "";

  for(var i = 0; i < list.length; i++){
    listForFile += list[i] + "\n"
  }

  writeToFile = async (file, data) => {
    try{
      await fse.outputFile(file, data)
    } catch (err){
      console.log(err)
    }
  }
  writeToFile(file_list, listForFile)

  const url = 'http://receipt.taxcom.ru/v01/show?' + req.body.query

  const pythonScript = async () => {
    const {stdout, stderr} = await bash("python3 parse_html.py --url '"+url+"'"+" --file '" + file_list + "''")
    //scructure: [check, [newToBuyList]]
    return JSON.parse(stdout)
  }
  let output = pythonScript()
  let history = output[0]
  let newToBuy = output[1]
  toBuySynchronize(req.body.family, newToBuy)

  for(var i = 0; i < family.length; i++){
    family.history.push({value: history.value, amount: history.amount, price: history.price})
  }
  family.save((err) => {
    if(err) console.log(err);
  })

  console.log('end')
})

app.post('/api/to-buy', (req, res) => { //req.body.family req.body.list
    console.log('/api/to-buy')
    if(!req.body.family){
      console.log("no family")
      return;
    }
    if(!req.body.list){
      console.log('no list')
      return;
    }
    toBuySynchronize(req.body.family, req.body.list)
    console.log('end')
})

app.get('*', (req, res) => {
  console.log('*')
  res.sendFile(path.join(root, 'dist/index.html'));
});
