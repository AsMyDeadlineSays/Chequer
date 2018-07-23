var qs = require('qs')
const axios = require('axios')
const { JSDOM } = require('jsdom')

const getReceiptContent = async qr => {
  const resp = await axios.post('https://get-ofz-json-from-qr.enzolab.ru', qs.stringify({ qr }))

  const dom = new JSDOM(resp.data)
  const json = dom.window.document.querySelector('textarea').value

  const data = JSON.parse(json)
  const items = data.document.receipt.items

  const bought = items.map(item => ({
    value: item.name,
    price: parseInt(item.price)/100, // price is returned in Kopeiki
    amount: item.quantity
  }))

  return {
    bought: bought
  }
}

const removeFromToBuy = (toBuy, bought) => {
  toBuy = new Set(toBuy)
  bought = new Set(bought)

  return [...toBuy].filter(x => !bought.has(x))
}

module.exports = {
  getReceiptContent,
  removeFromToBuy
}