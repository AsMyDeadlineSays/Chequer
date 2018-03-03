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


export const bought = ({commit}, boughtItems) => {
  commit('bought', boughtItems)
}