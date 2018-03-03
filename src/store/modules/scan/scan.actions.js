export const hydrate = ({commit}, query) => new Promise((resolve, reject) => {
  commit('parsed', query)
  const core = query.split('&')
                 .filter(s => s.startsWith('fp') || s.startsWith('s'))
                 .join('&')

  fetch('/api/parse-receipt', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ query: core })
  })
    .then(req => req.json())
    .then(data => {
      console.log(data)
    })
    .then(resolve)
    .catch(reject)
})