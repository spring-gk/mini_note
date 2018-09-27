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
var data={
  name : 'webarn',
  sex : '男',
  content : '2222,可以更改'
};

router.get('/', function(req, res) {
	//res.send("^_^ Hello ^_^");
	res.render('login',data)
});

module.exports = router;