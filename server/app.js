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
const utils = require('./utils')
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

app.use('/static/', express.static(static_dir))
app.use(bodyParser.json())
//app.use(cookieParser())

const toBuySynchronize = async (familyId, list) => {
  let family = await Family.findOne({_id:familyId})
  if(!family){
    family = await new Family({history: [], toBuy: []})
    try{
      await family.save()
    } catch(err){
        console.log(err)
    }
  }
  //console.log(typeof list, list)

  family.toBuy = list
  await family.save((err) => {
    if(err) console.log(err)
  })
  return family.toBuy
}

//ROUTING
//API
// /api/family/
// /api/family/merge
// /api/parse-receipt
// /api/to-buy
// *


app.put('/api/family/', async (req, res) => {
  console.log('/api/family')
  const newFamily = await new Family({history: [], toBuy: []})
  try{
    await newFamily.save()
    //console.log('new family with id ' + newFamily._id)
    res.send({id: newFamily._id})
    //res.redirect('/')
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
    return
  }
  if(!req.body.family){
    console.log('no family')
    return
  }

  //DB FIND
  const family = await Family.findOne({_id: req.body.family})

  const list = await family.toBuy.map(x => x.value)

  const output = await utils.getReceiptContent(req.body.query)
  const bought = output.bought.map(x => x.value)

  const tagsStr = await ml.tag(items.join(' | '))
  const tags = tagsStr.replace('\n', '').split(' ').map(x => parseInt(x))

  const history = output.bought
                    .map((x, idx) => Object.assign({}, x, {tag: tags[idx]}))


  family.toBuy = utils.removeFromToBuy(family.toBuy.map(x => x.value), bought)
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
      return
    }
    if(!req.body.list){
      console.log('no list')
      return
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

app.get('/sw.js', (req, res) => {
  res.set('Content-Type', 'application/javascript')
  res.sendFile(path.join(__dirname, 'sw.js'))
})

app.get('/manifest.webmanifest', (req, res) =>{
  res.set('Content-Type', 'application/json')
  res.sendFile(path.join(root, 'dist/static/manifest.json'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'dist/index.html'))
})