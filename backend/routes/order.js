const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let mockOrdersList = require('../mocks/orders-list.json');
let mockOrder = require('../mocks/order.json');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();

router.get('/order/:id', (req, res) => {
  const request = req.params.id;
  res.json(mockOrder);
});

router.get('/orders', (req, res) => {
  res.json(mockOrdersList);
});

router.post('/order', urlEncodedParser, json, (req, res) => {
  mockCart = req.body;
  res.json({
    "message": "Order placed successfully"
  });
});

module.exports = router;
