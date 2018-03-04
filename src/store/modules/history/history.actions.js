export const get = ({commit, rootState}) => {
  return fetch('/api/history/' + rootState.family)
          .then(res => res.json())
          .then(data => {
            commit('set', data)
          })
}