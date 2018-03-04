//REQUIRES FOREIGN
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pythonShell = require('python-shell')
const util = require('util')
const bash = require('child_process').spawn
const fse = require('fs-extra')
//const cookieParser = require('cookie-parser')


//REQUIRES LOCAL
const setup = require('./setup/index')
const config = require('./config')
// console.log('setting up a connection')
// try{
//   mongoose.connect('mongodb://localhost:27017/foodhack')
//   console.log('connection is stable')
// } catch(err){
//   console.log(err)
// }

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
//app.use(cookieParser())

const toBuySynchronize = async (familyId, list) => {
  const family = await Family.findOne({_id:familyId})

  console.log(typeof list, list)

  family.toBuy = list
  await family.save((err) => {
    if(err) console.log(err)
  })
  return family.toBuy;
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

app.put('/api/family/', async (req, res) => {
  console.log('/api/family')
  const newFamily = new Family({history: []})
  try{
    await newFamily.save()
    console.log('new family with id ' + newFamily._id)
    res.send({id: newFamily._id})
  } catch(err){
      console.log(err)
  }
  console.log('end')
})

app.get('/family/join/:id', async (req, res) => {
    console.log('/api/family/join/:id')
    res.cookie('family', req.params.id)
    res.redirect('/')
})

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
  try {
    console.log(req.body)
    family = await Family.findOne({_id: req.body.family})
  } catch(err){
      console.error('SHIT COMES NEXT', err)
  }

  let list = undefined;
  try{
    list = await family.toBuy.map(x => x.value)
  }catch(err){
    console.log(err)
  }
  var listForFile = "";
  if(list){
    for(var i = 0; i < list.length; i++){
      listForFile += list[i] + "\n"
    }
  }

  writeToFile = async (file, data) => {
    try{
      await fse.outputFile(file, data)
    } catch (err){
      console.log(err)
    }
  }


  await writeToFile(file_list, listForFile)

  const url = 'http://receipt.taxcom.ru/v01/show?' + req.body.query

  const pythonScript = () => new Promise((resolve, reject) => {
    const parser = bash('python3', ['parse_html.py',
     `--url`, `${url}`, `--file`, `${file_list}`])
    //scructure: [check, [newToBuyList]]
    parser.stdout.on('data', (data) => {
      data = data.toString()
      resolve(JSON.parse(data))
    })

    parser.stderr.on('error', (data) => {
      reject(data)
    })
  })

  let output = await pythonScript()

  let time = output.time
  let history = output.bought
  let newToBuy = output.newToBuy.map(x => ({value: x, amount: 1, price: ""}))

  family.toBuy = newToBuy

  for(var i = 0; i < history.length; i++) family.history.push(history[i])

  try{
    await family.save()
  } catch(err){
    console.error(err)
  }

  res.send(history)
  console.log('end')
})

app.post('/api/to-buy', async (req, res) => { //req.body.family req.body.list
    console.log('/api/to-buy')
    if(!req.body.family){
      console.log("no family")
      return;
    }
    if(!req.body.list){
      console.log('no list')
      return;
    }
    await toBuySynchronize(req.body.family, req.body.list)
    console.log('end')
})

app.get('/api/to-buy/:family', async (req, res) => {
    const family = await Family.findOne({_id: req.params.family})
    console.log(family)
    res.send(family.toBuy)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'dist/index.html'));
});

//app.listen(3000, () => console.log('App listening on port 3000!'))
