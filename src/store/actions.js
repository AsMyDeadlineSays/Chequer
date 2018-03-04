const getCookie = name => {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const getFamily = ({commit}) => new Promise((resolve, reject) => {
  const cookie = getCookie('family')
  if(cookie) {
    commit('setFamily', cookie)
    return resolve(cookie)
  }

  const ls = localStorage.getItem('family')
  if(ls) {
    commit('setFamily', ls)
    return resolve(ls)
  }
  
  fetch('/api/family/', {
    method: 'PUT'
  })
    .then(res => res.json())
    .then(data => {
      commit('setFamily', data.id)
      localStorage.setItem('family', data.id)
      resolve()
    })
    .catch(reject)
})