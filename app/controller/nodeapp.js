'use strict';
var express = require('express'),
    router = express.Router(),
    nodeapp_model = require('../model/nodeapp');
// 该路由使用的中间件
/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

*/
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
});

router.get('/', function(req, res) {
	res.render('nodeapp')
	//res.render('nodeapp');
});

router.get('/data',function(req,res){
	var data = {
		"code": 0,
		"msg": "",
		"count": 0,
		"data": []
	};
	var page = req.query.page;
    var page_size = req.query.limit;
    if(page == undefined || page == "")
    	page = 1;
    if(page_size == undefined || page_size == "")
    	page_size = 10;
	nodeapp_model.getNodeAppListAsync(page,page_size).then(function(result){
		data.data = result.data;
		data.count = result.count;
		res.send(data);
	}).catch(function(err){
		data.code = 1;
		data.msg = err;
		res.send(data);
	});
});


module.exports = router;