'use strict';
var express = require('express'),
	bodyParser = require('body-parser'),
	urlencodedParser = bodyParser.urlencoded({ extended: false }),
    router = express.Router(),
    model_base_func = require('../model/model_base');
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
	res.render('tags');
});

router.get('/handle', function(req, res) {
	res.render('tags_handle')
});

router.post('/doAction', urlencodedParser,function(req, res) {
	var result = {
		"code": 0,
		"msg": "",
		"data": ""
	};
	try{
		var action_type = req.body.action_type;
		switch(action_type) {
			case "doTag":
				var title = req.body.title;
				var tid = req.body.tid;
				if(title == undefined || title == "")
					throw "标签标题不能为空！";
				if(tid != undefined && tid !=0){
					var sql = {
					  sql: 'UPDATE `mn_tags` SET title=? WHERE tid=?',
					  values: [title,tid]
					};
				}else{
					var sql = {
					  sql: 'INSERT INTO `mn_tags` (`title`) VALUES (?)',
					  values: [title]
					};
				}				
				break;
			case "doDel":
				var tid = req.body.tid;
				var sql = {
				  sql: 'DELETE FROM `mn_tags` WHERE tid=?',
				  values: [tid]
				};
				break;
			case "doIsAble":
				var tid = req.body.tid;
				var is_able = req.body.is_able;
				if(is_able=="true"){
					is_able = 1;
				}else{
					is_able = 0;
				}
				var sql = {
				  sql: 'UPDATE `mn_tags` SET is_able=? WHERE tid=?',
				  values: [is_able,tid]
				};
				break;
		}
		console.log(sql);
		model_base_func.doSqlCmd(sql).then(function(result){
			result.code = 1;
			res.send(result);
		}).catch(function(err){
			result.msg = err;
			res.send(result);
		});

	}catch(e){
		result.msg = e;
		res.send(result);
	}
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
	model_base_func.getDataList("mn_tags",page,"*","update_time desc",page_size).then(function(result){
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