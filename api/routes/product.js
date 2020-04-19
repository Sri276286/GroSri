const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const Product = require('../models/product');

const mockProducts = require('../mocks/products.json');
const mockProductsFromStore = require('../mocks/product.json');

// const itemOne = Product({
//   "id": "1",
//   "name": "Item1",
//   "quantity": 0,
//   "price": 55
// }
// ).save((err) => {
//   if (err) throw err;
//   console.log('Item saved');
// });

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();


router.get('/products', (req, res) => {
  // Product.find({}, (err, data) => {
  //   if (err) throw err;
  //   res.json(data);
  // });
  res.json(mockProducts);
});

router.get('/products/:id', (req, res) => {
  // Product.find({}, (err, data) => {
  //   if (err) throw err;
  //   res.json(data);
  // });
  res.json(mockProductsFromStore);
});

router.post('/products', urlEncodedParser, json, (req, res) => {
  const pro = req.body;
  console.log('product ', pro);
  let product = Product(pro);
  product.save();
  res.sendStatus(200);
});

module.exports = router;

  // app.post('/todo', urlEncodedParser, (req, res) => {
  //     // get data from view and add it to mongodb
  //     var newTodo = Todo(req.body).save((err, data) => {
  //         if (err) throw err;
  //         res.json(data);
  //     })
  // });

  // app.delete('/todo/:item', (req, res) => {
  //     // delete requested item from mongodb
  //     Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove((err, data) => {
  //         if (err) throw err;
  //         res.json(data);
  //     });
  // });

