const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

const userService = require('../services/user.service');

const users = require('../mocks/users.json');


const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();


router.post('/login', urlEncodedParser, json, (req, res) => {
  console.log('body ', req.body);
  userService.login(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err))
});

router.get('/user/:id', (req, res) => {
  const id = req.params.id;
  console.log('user id ', id);
  const user = users.find(user => user.userId === id);
  console.log('user ', user);
  res.json(user);
});

router.post('/signup', urlEncodedParser, json, (req, res) => {
  const userReg = req.body;
  console.log('userReg ', userReg);
  let user = User(userReg);
  user.save();
  res.send({}).status(200);
});

module.exports = router;


