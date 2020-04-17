const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
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
  },
  weight: {
    type: String
  }
});
Item = mongoose.model('Item', ItemSchema);

const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String
  },
  orderType: {
    type: Boolean
  },
  items: {
    type: Array
  }
});
module.exports = Order = mongoose.model('Order', OrderSchema);
