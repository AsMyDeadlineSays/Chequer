export const add = ({commit}, {value, amount, measure}) => {
  commit('add', {
    value, 
    amount,
    measure
  })
}


export const bought = ({commit}, boughtItems) => {
  commit('bought', boughtItems)
}