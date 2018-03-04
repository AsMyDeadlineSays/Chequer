const spawn  = require('child_process').spawn


const preSetupMLParse = async (logger) => {}


const setupMLParse = (logger) => new Promise((resolve, reject) => {
  let up = false
  logger.log('Checking mlParse')

  const parse = spawn('python3', ['receipt parser', ''])
  
  parse.stdin.setEncoding('utf-8')
  parse.stdout.on('data', (data) => {
    if(up) return
    if(data.indexOf('up') !== -1) {
      up = true
      logger.log('ML PARSE ok \n')
      resolve(parse)
    }
  })

  parse.stderr.on('data', (data) => {
    if(up) return
    logger.error(`ML PARSE stderr: ${data}`)
    reject(data)
  })

  parse.on('close', (code) => {
    reject(code)
  })

  process.on('SIGINT', () => {
    parse.stdin.write('-1')
    parse.stdin.end()
    parse.kill('SIGINT')
  })
})

module.exports = {
    prepare: preSetupMLParse,
    execute: setupMLParse,
}
