const express = require('express');
const router = express.Router();

const mockStores = require('../mocks/stores.json');

router.get('/stores', (req, res) => {
  res.json(mockStores);
});

module.exports = router;


