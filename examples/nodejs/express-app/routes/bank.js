var express = require('express');
var router = express.Router();
var app = express();
/* GET */
app.get('/home/news', function(req, res, next) {
  let data = require('../data/home/news.js')
  res.send({
    code: '0000',
    data
  });
});
app.get('/home/prouduct/list', function(req, res, next) {
  let data = require('../data/home/product/list.js')
  res.send({
    code: '0000',
    data
  });
});

