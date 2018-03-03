export const getFamily = ({commit}) => new Promise((resolve, reject) => {
  fetch('/api/family/', {
    method: 'PUT'
  })
    .then(res => res.json())
    .then(() => {
      commit('setFamily', res.id)
      resolve()
    })
    .catch(reject)
})