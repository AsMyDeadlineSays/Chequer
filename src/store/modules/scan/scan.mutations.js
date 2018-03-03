export const parsed = (state, url) => {
  state.parsed = true
}


export const setBill = (state, bill) => {
  state.hydrated = true
  state.bill = bill
}