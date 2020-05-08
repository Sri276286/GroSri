const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let mockOrder = require('../mocks/order.json');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();

router.get('/order', (req, res) => {
  res.json(mockOrder);
});

router.post('/order', urlEncodedParser, json, (req, res) => {
  mockCart = req.body;
  res.json({
    "message": "Order placed successfully"
  });
});

module.exports = router;
