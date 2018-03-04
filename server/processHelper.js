const createHelper = process => {
  let lastPromise = Promise.resolve()
  return input => {
    let resolve, reject
    const self = new Promise((pResolve, pReject) => {
      resolve = pResolve
      reject = pReject
    })

    lastPromise.then(() => {
      lastPromise = self

      process.stdout.on('data', data => {
        //console.log('helper got', data.toString())
        resolve(data.toString())
      })

      process.stderr.on('data', data => {
        console.error('process fail', data.toString());
        reject(data.toString())
      })

      process.on('close', (code) => {
        console.log('ec', code)
        reject(code)
      })

      process.stdin.write(input)
      process.stdin.end()
    })

    return self
  }
}

module.exports = createHelper
