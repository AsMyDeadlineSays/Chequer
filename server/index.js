const express = require('express')
const path = require('path')


const app = express()
const root = __dirname + '/../'
const static_dir = path.join(root, 'dist', 'static')



app.use(express.static('/static/', static_dir));

app.get('*', function (req, res) {
  res.send_file(root + '/static/index.html');
});

//app.get('');

app.listen(3000, () => console.log('App listening on port 3000'))
