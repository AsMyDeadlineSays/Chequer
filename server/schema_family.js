const mongoose = require('mongoose')

const oneBuy = new mongoose.Schema({
  value: String,
  amount: String,
  price: Number,
  tag: Number
})

const familySchema = new mongoose.Schema({
  history: [oneBuy],
  toBuy: [oneBuy]
})


// familySchema.methods.addNewFamily = function(cb){
//   return new familySchema(history: null)
// }

var Family = mongoose.model('Family', familySchema)

module.exports = {
    Family
}
