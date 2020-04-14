const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  }
});
module.exports = Product = mongoose.model('Product', ProductSchema);
