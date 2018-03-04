const spawn  = require('child_process').spawn
const config = require('../config')
const path = require('path')

const preSetupMLTag = async (logger) => {}


const setupMLTag = (logger) => new Promise((resolve, reject) => {
  let up = false
  logger.log('Checking mlTag')

  const tag = spawn('python3', [path.join(config.path.root, '..', 'ml', 'predict.py')])

  tag.stdin.setEncoding('utf-8')
  tag.stdout.once('data', (data) => {
    if(up) return
    if(data.indexOf('up') !== -1) {
      up = true
      logger.log('ML Tag ok \n')
      resolve(tag)
    }
  })

  tag.stderr.once('data', (data) => {
    if(up) return
    logger.error(`ML Tag stderr: ${data}`)
    reject(data)
  })

  tag.once('close', (code) => {
    reject(code)
  })

  process.once('SIGINT', () => {
    tag.stdin.write('-1')
    tag.stdin.end()
    tag.kill('SIGINT')
  })
})

module.exports = {
    prepare: preSetupMLTag,
    execute: setupMLTag,
}
