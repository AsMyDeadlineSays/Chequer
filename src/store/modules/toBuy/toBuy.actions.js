export const add = ({commit, state, rootState}, {value, amount, measure}) => {
  commit('add', {
    value,
    amount,
    measure
  })

  fetch('/api/to-buy/', {
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
  console.log('getting to-buy')
  return fetch('/api/to-buy/' + rootState.family)
          .then(res => res.json())
          .then(data => {
            commit('set', data)
          })
}


export const bought = ({commit, state, rootState}, boughtItems) => {
  commit('bought', boughtItems)

  fetch('/api/to-buy/', {
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
