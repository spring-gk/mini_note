'use strict';
var express = require('express'),
    router = express.Router(),
    rbac = require('../library/rbac');
// 该路由使用的中间件
/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

*/
router.use(function (req, res, next) {
 // console.log(req.cookies);
  //console.log('Time:', Date.now())
  next()
});

router.get('/', function(req, res) {
	//res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
	res.render('notes');
});

router.get('/handle', function(req, res) {
	res.render('notes_handle')
});

router.post('/doAction',function(req, res) {
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
				var tid = parseInt(req.body.tid);
				if(title == undefined || title == "")
					throw "标签标题不能为空！";
				if(tid != undefined && tid !=0){
					var sql = {
					  sql: 'UPDATE `mn_notes` SET title=? WHERE tid=?',
					  values: [title,tid]
					};
				}else{
					var sql = {
					  sql: 'INSERT INTO `mn_notes` (`title`) VALUES (?)',
					  values: [title]
					};
				}				
				break;
			case "doDel":
				var tid = parseInt(req.body.tid);
				var sql = {
				  sql: 'DELETE FROM `mn_notes` WHERE tid=?',
				  values: [tid]
				};
				break;
			case "doIsAble":
				var tid = parseInt(req.body.tid);
				var is_able = req.body.is_able;
				if(is_able=="true"){
					is_able = 1;
				}else{
					is_able = 0;
				}
				var sql = {
				  sql: 'UPDATE `mn_notes` SET is_able=? WHERE tid=?',
				  values: [is_able,tid]
				};
				break;
		}
		console.log(sql);
		rbac.doSqlCmdAsync(sql).then(function(result){
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
    	page_size = 5;
    rbac.useTable("mn_notes").select("COUNT(1) AS total").get().then(function(result){
		var count = result[0]['total'];
		rbac.useTable("mn_notes").select("*").orderBy('tid','desc').limit((page-1)*page_size,page_size).get().then(function(res22){
			data.count = count;
			data.data = res22;
			res.send(data);
		}).catch(function(err){
			data.code = 1;
			data.msg = err;
			res.send(data);
		});
	}).catch(function(err){
		data.code = 1;
		data.msg = err;
		res.send(data);
	});
});


module.exports = router;