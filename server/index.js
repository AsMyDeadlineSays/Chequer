const express = require('express')
const app = express()
const root = __dirname + '/../'
//app.engine('pug', require('pug').__express)
app.set('views', __dirname + '/views/');

app.get('*', function (req, res) {
  res.send_file(root + '/static/index.html');
})

app.get('')

app.listen(3000, () => console.log('App listening on port 3000'))
