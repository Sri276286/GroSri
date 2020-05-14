const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let mockStores = require('../mocks/store-list.json');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();

router.get('/store/:id', (req, res) => {
  const request = req.params.id;
  res.json(mockStores);
});

router.post('/store/favorite', urlEncodedParser, json, (req, res) => {
  const request = req.body;
  res.json({
    message: "Store Favorited successfully"
  });
});

module.exports = router;
