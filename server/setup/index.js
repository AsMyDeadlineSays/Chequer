const config = require('../config')
const logger = config.logger

const setups = [
    {
        funcs: require('./db'),
        args: {
            prepare: [config.path.db],
            execute: [config.mongoUrl]
        }
    }, {
        funcs: require('./mlParse'),
        args: {
            prepare: [],
            execute: []
        }
    }, {
        funcs: require('./mlTag'),
        args: {
            prepare: [],
            execute: []
        }
    }
]


const setupBackend = async () => {
    logger.log('\n ------ \nSetting up backend')

    await Promise.all(setups.map(setup => setup.funcs.prepare(logger, ...setup.args.prepare)))
    const processes = await Promise.all(setups.map(setup => setup.funcs.execute(logger, ...setup.args.execute)))

    process.on('SIGINT', () => {
        setTimeout(process.exit(), 15)
    })

    logger.log('Setup Sucessful\n ------ \n')
    return processes
}

module.exports = setupBackend
