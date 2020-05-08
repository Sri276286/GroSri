const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let mockUsers = require('../mocks/user.json');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const json = bodyParser.json();

router.get('/user', (req, res) => {
  res.json(mockUsers[0]);
});

router.post('/user', urlEncodedParser, json, (req, res) => {
  const request = req.body;
  res.json({});
});

router.post('/login', urlEncodedParser, json, (req, res) => {
  // {"email":"test@gmail.com","password":"Test@123"}
  const request = req.body;
  res.json({
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNTg4ODY4MTA5LCJleHAiOjE1ODg4NzUzMDl9.dnPasTIkeLU1-sYKuCcboau46672EKqBWxOV3xukU6KFHzF8qJda8LEZAJbJNSBdk4hs7mCzrxEVCaKxx9VgdQ",
    "tokenType": "Bearer"
  });
});

router.post('/signup', urlEncodedParser, json, (req, res) => {
  // {"name":"Test User","pincode":"","email":"test2@gmail.com","mobileNumber":7896543210,"password":"Test@456789","confirm_password":"Test@456789"}
  const request = req.body;
  res.json({
    "success": true,
    "data": null,
    "message": "User registered successfully@"
  });
});

module.exports = router;
