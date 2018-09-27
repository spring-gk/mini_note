'use strict';
var express = require('express'),
    router = express.Router();
// 该路由使用的中间件
/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/
router.get('/', function(req, res) {
	//res.send("^_^ Hello ^_^");
	res.render('admin')
});

router.get('/welcome', function(req, res) {
	//res.send("^_^ Hello ^_^");
	res.render('welcome')
});

module.exports = router;