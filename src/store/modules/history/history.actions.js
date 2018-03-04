export const add = ({commit, state, rootState}, {value, amount, measure}) => {
  commit('add', {
    value, 
    amount,
    measure
  })

  return fetch('/api/to-buy/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ 
      family: rootState.family,
      list: state.items 
    })
  })
}

export const get = ({commit, rootState}) => {
  return fetch('/api/to-buy/' + rootState.family)
          .then(res => res.json())
          .then(data => {
            data.forEach(item => commit('add', item))
          })
}


export const bought = ({commit}, boughtItems) => {
  commit('bought', boughtItems)
}