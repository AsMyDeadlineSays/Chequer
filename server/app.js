//REQUIRES FOREIGN
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const pythonShell = require('python-shell')
const util = require('util')
const bash = require('child_process').spawn
const fse = require('fs-extra')
const processHelper = require('./processHelper')
//const cookieParser = require('cookie-parser')


//REQUIRES LOCAL
const setup = require('./setup/index')
const config = require('./config')

//GLOBAL VARs
//const parse_script = 'parse_html.py'
const file_list = 'list.txt'
const ml = {
  parse: null,
  tag: null
}

//INIT
setup().then(proc => {
    ml.parse = processHelper(proc[1])
    ml.tag = processHelper(proc[2])

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

  //console.log(typeof list, list)

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
  const newFamily = new Family({history: [], toBuy: []})
  try{
    await newFamily.save()
    //console.log('new family with id ' + newFamily._id)
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

  //VALIDATION
  if(!req.body.query){
    console.log('no query')
    return;
  }
  if(!req.body.family){
    console.log('no family')
    return;
  }

  //DB FIND
  const family = await Family.findOne({_id: req.body.family})

  //PREPATING TXT
  const list = await family.toBuy.map(x => x.value)

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



  const parseData = await ml.parse(url + ' ' + file_list)

  const output = JSON.parse(parseData)

  const time = output.time
  const tagsStr = await ml.tag(output.bought.map(x => x.value).join(' | '))
  const tags = tagsStr.replace('\n', '').split(' ').map(x => parseInt(x))

  const history = output.bought
                    .map((x, idx) => Object.assign({}, x, {tag: tags[idx]}))
                    .map(x => {
                      x.price = parseFloat(x.price)
                      return x
                    })


  const newToBuy = output.newToBuy.map(x => ({value: x, amount: 1, price: "", tag: ""}))

  family.toBuy = newToBuy
  history.forEach(x => family.history.push(x))

  try{
    await family.save()
  } catch(err){
    console.error(err)
  }

  res.send({})
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
    //console.log(family)
    res.send(family.toBuy)
})

app.get('/api/history/:id', async (req, res) => {
    const family = await Family.findOne({_id:req.params.id})
    res.send(family.history)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'dist/index.html'));
});

//app.listen(3000, () => console.log('App listening on port 3000!'))
