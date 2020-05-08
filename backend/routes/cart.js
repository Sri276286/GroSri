const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let mockCart = require('../mocks/cart.json');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();

router.get('/cart', (req, res) => {
  res.json({});
});

router.post('/cart', urlEncodedParser, json, (req, res) => {
  mockCart = req.body;
  res.json({});
});

module.exports = router;
