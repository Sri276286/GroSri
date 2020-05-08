const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let mockStores = require('../mocks/store-list.json');

router.get('/store/:id', (req, res) => {
  const request = req.params.id;
  res.json(mockStores);
});

module.exports = router;
