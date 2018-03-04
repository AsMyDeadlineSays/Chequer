export const set = (state, data) => {
  data.sort()

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
  console.log(categories, dataMap, data)

  state.items = Object.values(dataMap)
  state.categories = categories
}
