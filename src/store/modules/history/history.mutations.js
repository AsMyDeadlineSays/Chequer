export const add = (state, item) => {
  const existing = state.items.find(x => x.value === item.value)

  if(existing) existing.amount += item.amount
  else state.items.push(item)
}

export const bought = (state, boughtItems) => {
  if(! Array.isArray(boughtItems)) {
    boughtItems = [boughtItems]
  }

  boughtItems.forEach(boughtItem => {

    const item = state.items.find((item) =>
      boughtItem.value === item.value
    )

    item.amount -= boughtItem.amount 
    if( ! item.measure) item.amount = 0
  })

  state.items = state.items.filter(x => x.amount > 0)
}