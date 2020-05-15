const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const mockStores = require('../mocks/store-list.json');
const mockFavoriteStores = require('../mocks/fav-store-list.json');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();

router.get('/store/favorite', (req, res) => {
  res.json(mockFavoriteStores);
});

router.post('/store/favorite', urlEncodedParser, json, (req, res) => {
  const request = req.body;
  res.json({
    message: "Store Favorited successfully"
  });
});

router.get('/store/:id', (req, res) => {
  const request = req.params.id;
  res.json(mockStores);
});

module.exports = router;
