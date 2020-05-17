const express = require('express');
const router = express.Router();

let mockStoreProducts1 = require('../mocks/store-product-1.json');
let mockStoreProducts2 = require('../mocks/store-product-2.json');

router.get('/items-list/:id', (req, res) => {
  const request = req.params.id;
  console.log('request ', request);
  if (request === '1') {
    res.json(mockStoreProducts1);
  } else {
    res.json(mockStoreProducts2);
  }
});

module.exports = router;
