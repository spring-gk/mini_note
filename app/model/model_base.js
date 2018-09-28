var mysql_func = require('../library/mysql'),
	init = {};

/**
 * 获取分页列表
 * @param  {[type]} table_name [description]
 * @param  {[type]} page       [description]
 * @param  {[type]} fields     [description]
 * @param  {[type]} orderby    [description]
 * @param  {[type]} page_size  [description]
 * @return {[type]}            [description]
 */
init.getDataList = function(table_name,page,fields,orderby,page_size){
	if(fields == undefined || fields == ""){
		fields = "*";
	}
	if(page == undefined || page == ""){
		page = 1;
	}
	if(page_size == undefined || page_size == ""){
		page_size = 10;
	}

	var from = (page - 1) * page_size;
	var to = page * page_size;
	
	var count_sql = "select count(1) as total from " + table_name;
	var sql = "select "+fields+" from " + table_name;
	if(orderby != undefined && orderby != ""){
		sql += " order by " + orderby;
	}
	sql += " limit " + from + "," + to;
    return new Promise(function(resolve,reject){
    	mysql_func.doSqlCmdAsync(count_sql).then(function(res){
    		var count = res[0]['total'];
			mysql_func.doSqlCmdAsync(sql).then(function(res){
				var result = {
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
/**
 * 获取数据详细
 * @param  {[type]} table_name [description]
 * @param  {[type]} fields     [description]
 * @param  {[type]} where      [description]
 * @return {[type]}            [description]
 */
init.getDataDetail = function(table_name,fields,where){
	var sql = "select " + fields + " from " + table_name + " where " + where;
	return new Promise(function(resolve,reject){
    	mysql_func.doSqlCmdAsync(sql).then(function(res){
			resolve(res);
		}).catch(function(err){
			reject(err);
		});	
	});
}

/**
 * 删除数据
 * @param  {[type]} table_name [description]
 * @param  {[type]} where      [description]
 * @return {[type]}            [description]
 */
init.deleteData = function(table_name,where){
	var sql = "DELETE FROM " + table_name + " where " + where;
	return new Promise(function(resolve,reject){
    	mysql_func.doSqlCmdAsync(sql).then(function(res){
			resolve(res);
		}).catch(function(err){
			reject(err);
		});	
	});
}
/**
 * 创建数据
 * @param  {[type]} sql [description]
 * @return {[type]}     [description]
 */
init.createData = function(sql){
	return this.doSqlCmd(sql);
}
/**
 * 更新数据
 * @param  {[type]} sql [description]
 * @return {[type]}     [description]
 */
init.updateData = function(sql){
	return this.doSqlCmd(sql);
}
/**
 * 执行sql命令
 * @param  {[type]} sql [description]
 * @return {[type]}     [description]
 */
init.doSqlCmd = function(sql){
	return new Promise(function(resolve,reject){
    	mysql_func.doSqlCmdAsync(sql).then(function(res){
			resolve(res);
		}).catch(function(err){
			reject(err);
		});	
	});	
}

module.exports=init;