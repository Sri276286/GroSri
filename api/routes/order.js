const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const Order = require('../models/order');

const mockOrders = require('../mocks/orders.json');

// const itemOne = Product({
//   "id": "1",
//   "name": "Item1",
//   "quantity": 0,
//   "price": 55
// }
// ).save((err) => {
//   if (err) throw err;
//   console.log('Item saved');
// });

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();


router.get('/orders', (req, res) => {
  // Order.find({}, (err, data) => {
  //   if (err) throw err;
  //   res.json(data);
  // });
  res.json(mockOrders);
});

router.post('/order', urlEncodedParser, json, (req, res) => {
  const orderPlaced = req.body;
  console.log('orderPlaced ', orderPlaced);
  let order = Order(orderPlaced);
  order.save();
  res.send({}).status(200);
});

module.exports = router;


