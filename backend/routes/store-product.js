const express = require('express');
const router = express.Router();

let mockStoreProducts = require('../mocks/store-product.json');

router.get('/items-list/:id', (req, res) => {
  const request = req.params.id;
  res.json(mockStoreProducts);
});

module.exports = router;
