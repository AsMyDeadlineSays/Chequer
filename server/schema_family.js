const mongoose = require('mongoose')

const oneBuy = new mongoose.Schema({
  valut: String,
  amount: String,
  price: String
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
