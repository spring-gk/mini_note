/*var mysql_func = require('./app/library/mysql');
var sql = "select * from node_app";
mysql_func.doSqlCmdAsync(sql).then(function(res){
	res.map(function(item){
		console.log(item['aid']);
	});
}).catch(function(err){
	console.log(err);
});*/
/*var nodeapp_model = require('./app/model/nodeapp');
nodeapp_model.getNodeAppListAsync(1,10).then(function(res){
	console.log(res);
}).catch(function(err){
	console.log(err);
});*/

var common_func = require('./app/library/common');
console.log(common_func.generateToken());