const express = require('express');
const router = express.Router();

let mockStoresByCategory = require('../mocks/store-category.json');

router.get('/category/:id', (req, res) => {
  const request = req.params.id;
  res.json(mockStoresByCategory);
});

module.exports = router;
