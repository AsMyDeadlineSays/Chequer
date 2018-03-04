const spawn  = require('child_process').spawn


const preSetupMLTag = async (logger) => {}


const setupMLTag = (logger) => new Promise((resolve, reject) => {
  let up = false
  logger.log('Checking mlTag')

  const tag = spawn('python3', ['item Tag', ''])
  
  tag.stdin.setEncoding('utf-8')
  tag.stdout.on('data', (data) => {
    if(up) return
    if(data.indexOf('up') !== -1) {
      up = true
      logger.log('ML Tag ok \n')
      resolve(tag)
    }
  })

  tag.stderr.on('data', (data) => {
    if(up) return
    logger.error(`ML Tag stderr: ${data}`)
    reject(data)
  })

  tag.on('close', (code) => {
    reject(code)
  })

  process.on('SIGINT', () => {
    tag.stdin.write('-1')
    tag.stdin.end()
    tag.kill('SIGINT')
  })
})

module.exports = {
    prepare: preSetupMLParse,
    execute: setupMLParse,
}
