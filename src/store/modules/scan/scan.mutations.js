export const reset = state => {
  state.parsed = false
  state.hydrated = false
}

export const parsed = (state, url) => {
  state.parsed = true
}


export const setReceipt = (state, receipt) => {
  state.hydrated = true
  state.receipt = receipt
}