const fse = require('fs-extra')
const spawn  = require('child_process').spawn
const mongoose = require('mongoose'); mongoose.Promise = global.Promise

//const Mentor = require('../models/mentorModel')
//const Student = require('../models/studentModel')

const preSetupDB = async (logger, dbPath) => {
    logger.log('Ensuring db folder')

    await fse.ensureDir(dbPath)

    logger.log('db folder confirmed \n')
}


const setupDB = (logger, dbUrl) => new Promise((resolve, reject) => {
    logger.log('Checking db')

    const db = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'db'])

    db.stdout.on('data', (data) => {
        if(data.indexOf('waiting for connections') !== -1) {
            mongoose.connect(dbUrl)
            logger.log('db ok \n')
            resolve(db)
        }
    })

    db.stderr.on('data', (data) => {
        logger.error(`stderr: ${data}`)
    })

    db.on('close', (code) => {
        //this is pretty much already running
        if(code === 48 || code === 100) {
            mongoose.connect(dbUrl)
            logger.log('db ok \n')
            resolve(db)
        }
        else
            reject(code)
    })

    process.on('SIGINT', () => {
        db.kill('SIGINT')
    })
})

module.exports = {
    prepare: preSetupDB,
    execute: setupDB,
}
