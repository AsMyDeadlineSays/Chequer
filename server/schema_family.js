const mongoose = require('mongoose')

const oneBuy = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
})

const familySchema = new mongoose.Schema({
  history: [oneBuy]
})


// familySchema.methods.addNewFamily = function(cb){
//   return new familySchema(history: null)
// }

var Family = mongoose.model('Family', familySchema)

module.exports = {
    Family
}
