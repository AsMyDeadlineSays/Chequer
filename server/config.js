const path = require('path')
//port 8085
const config = {
    mongoUrl: 'mongodb://localhost:27017/test',
    appPort: 3000,
    appHost: 'sci.v-trof.ru',

    secret: 'tinderFTW',

    path: {
        root: __dirname,
        db: __dirname + '/db',
        dist: __dirname + '/dist'
    },

    OPTIONS: {
      user: 'admin',
      pass: 'admin123',
      auth: {
        authdb: 'foodhack'
      }
    },

    logger: console,

    session: {}
}

module.exports = config
