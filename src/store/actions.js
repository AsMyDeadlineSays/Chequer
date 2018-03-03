export const getFamily = ({commit}) => new Promise((resolve, reject) => {
  fetch('/api/family/', {
    method: 'PUT'
  })
    .then(res => res.json())
    .then(data => {
      commit('setFamily', data.id)
      resolve()
    })
    .catch(reject)
})