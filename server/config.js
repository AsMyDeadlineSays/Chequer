const path = require('path')
//port 8085
const config = {
    mongoUrl: 'mongodb://localhost:27017/foodhack',
    appPort: 8085,
    appHost: 'sci.v-trof.ru',

    secret: 'tinderFTW',

    path: {
        root: __dirname,
        db: __dirname + '/db',
        dist: __dirname + '/dist'
    },

    logger: console,

    session: {}
}

module.exports = config
