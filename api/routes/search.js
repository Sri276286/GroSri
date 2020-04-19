const express = require('express');
const router = express.Router();

let mockSearch = require('../mocks/search.json');

router.get('/search', (req, res) => {
  let copyMockSearch = mockSearch;
  const query = req.query.q;
  console.log('query ', req.query.q);
  console.log('mocks ', mockSearch);
  copyMockSearch = copyMockSearch.filter((t) => {
    console.log('index ', t.name.indexOf(query))
    return t.name.indexOf(query) !== -1
  });
  console.log('mocks after ', copyMockSearch);
  res.json(copyMockSearch);
});

module.exports = router;


