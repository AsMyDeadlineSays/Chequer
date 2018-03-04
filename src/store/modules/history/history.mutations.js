export const set = (state, data) => {
  const dataMap = {}
  const categories = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  data.forEach(data => {
    dataMap[data.value] = dataMap[data.value] || {
      value: data.value,
      tag: data.tag,
      spent: 0
    }

    dataMap[data.value].spent += data.price

    categories[data.tag] += data.price
  })

  const items = Object.values(dataMap)
  items.forEach(x => x.spent = Math.round(x.spent))
  items.sort((a, b) => {
    return b.spent - a.spent
  })

  state.items = items
  state.categories = categories
}
