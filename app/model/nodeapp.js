var mysql_func = require('../library/mysql');
//获取分页列表
var getNodeAppList = function(page,page_size){
	var from = (page - 1) * page_size;
	var to = page * page_size;
	var count_sql = "select count(1) as total from node_app";
    var sql = "select * from node_app order by update_time desc limit " + from + "," + to;
    var result = {
		'count': 0,
		'data' : []
	};
    return new Promise(function(resolve,reject){
    	mysql_func.doSqlCmdAsync(count_sql).then(function(res){
    		var count = res[0]['total'];
			mysql_func.doSqlCmdAsync(sql).then(function(res){
				result = {
					'count': count,
					'data' : res
				};
				resolve(result);
			}).catch(function(err){
				reject(err);
			});
		}).catch(function(err){
			reject(err);
		});		
	});
}
//获取应用详细
var getNodeAppDetail = function(aid,fields){
	if(fields == undefined || fields == "")
		fields = "*";
	var sql = "select "+fields+" from node_app where aid=" + aid;
	return new Promise(function(resolve,reject){
    	mysql_func.doSqlCmdAsync(sql).then(function(res){
    		resolve(res);
		}).catch(function(err){
			reject(err);
		});		
	});
}

var addNodeApp = function(){

}

var updateNodeApp = function(aid,update_data){

}

var export_func = {
    'getNodeAppListAsync': getNodeAppList,
    'getNodeAppDetailAsync': getNodeAppDetail,
    'addNodeAppAsync': addNodeApp,
    'updateNodeAppAsync': updateNodeApp
};

module.exports=export_func;