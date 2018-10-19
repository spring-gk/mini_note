'use strict';
var mysql_func = require('./mysql'),
    init = {
	table : "",
	fields : "*",
	where_action : [],
	group : [],
	order : [],
	limit_begin : "",
	limit_number : 0,
	update_data : [],
	insert_data : [],
	sql_raw : ""
};

var buildGetSql = function(){
	if(init.sql_raw){
		return init.sql_raw;
	}else{
		var sql = "SELECT "+init.fields+" FROM " + init.table;
		var values = [];
		if(init.where_action){
			for(var i=0;i<init.where_action.length;i++){
				values.push(init.where_action[i]['value']);
				if(i == 0){
					sql += " WHERE " + init.where_action[i]['field'] + " " + init.where_action[i]['action'] + " ?";
				}else{
					sql += " " + init.where_action[i]['condtion'] + " " + init.where_action[i]['field'] + " " + init.where_action[i]['action'] + " ?";
				}
			}
		}
		if(init.group){
			for(var i=0;i<init.group.length;i++){
				if(i == 0){
					sql += " GROUP BY " + init.group[i];
				}else{
					sql += "," + init.group[i];
				}
			}
		}
		if(init.order){
			for(var i=0;i<init.order.length;i++){
				if(i == 0){
					sql += " ORDER BY " + init.order[i]['o'] + " " + init.order[i]['ot'];
				}else{
					sql += "," + init.order[i]['o'] + " " + init.order[i]['ot'];
				}
			}
		}
		if(init.limit_begin || init.limit_number){
			sql += " LIMIT " + init.limit_begin;
			if(init.limit_number){
				sql += "," + init.limit_number;
			}
		}
		return {
			sql: sql,
		  	values: values
		};
	}
}

var buildCreateSql = function(){
	if(init.sql_raw){
		return init.sql_raw;
	}else{
		var sql = "INSERT INTO " + init.table;
		var values = [];
		if(init.insert_data){
			if(init.insert_data.length > 1){
				for(var i=0;i<init.insert_data.length;i++){
					if(i == init.insert_data.length-1){
						sql += init.insert_data[i]['field'] + "`)";
					}else if(i == 0){
						sql += "(`" + init.insert_data[i]['field'] + "`,`";
					}else{
						sql += init.insert_data[i]['field'] + "`,`";
					}
				}

				for(var i=0;i<init.insert_data.length;i++){
					values.push(init.insert_data[i]['value']);
					if(i == init.insert_data.length-1){
						sql += "?)";
					}else if(i == 0){
						sql += " VALUES (?,";
					}else{
						sql += "?,";
					}
				}
			}else{
				sql += "(`" + init.insert_data[0]['field'] + "`) VALUES (?)";
				values.push(init.insert_data[0]['value']);
			}
		}
		return {
			sql: sql,
		  	values: values
		};
	}
}

var buildUpdateSql = function(){
	if(init.sql_raw){
		return init.sql_raw;
	}else{
		var sql = "UPDATE " + init.table + " SET ";
		var values = [];
		if(init.update_data){
			for(var i=0;i<init.update_data.length;i++){
				values.push(init.update_data[i]['value']);
				if(i == init.update_data.length-1){
					sql += init.update_data[i]['field'] + "=? ";
				}else{
					sql += init.update_data[i]['field'] + "=?, ";
				}
				
			}
		}
		if(init.where_action){
			for(var i=0;i<init.where_action.length;i++){
				values.push(init.where_action[i]['value']);
				if(i == 0){
					sql += " WHERE " + init.where_action[i]['field'] + " " + init.where_action[i]['action'] + " ?";
				}else{
					sql += " " + init.where_action[i]['condtion'] + " " + init.where_action[i]['field'] + " " + init.where_action[i]['action'] + " ?";
				}
			}
		}
		return {
			sql: sql,
		  	values: values
		};
	}	
}

var buildDeleteSql = function(){
	if(init.sql_raw){
		return init.sql_raw;
	}else{
		var sql = "DELETE FROM " + init.table;
		var values = [];
		if(init.where_action){
			for(var i=0;i<init.where_action.length;i++){
				values.push(init.where_action[i]['value']);
				if(i == 0){
					sql += " WHERE " + init.where_action[i]['field'] + " " + init.where_action[i]['action'] + " ?";
				}else{
					sql += " " + init.where_action[i]['condtion'] + " " + init.where_action[i]['field'] + " " + init.where_action[i]['action'] + " ?";
				}
			}
		}
		return {
			sql: sql,
		  	values: values
		};
	}	
}



init.useTable = function(tableName){ 
	this.fields = "*";
	this.where_action = [];
	this.group = [];
	this.order = [];
	this.limit_begin = "";
	this.limit_number = 0;
	this.update_data = [];
	this.insert_data = [];
	this.sql_raw = "";
	this.table = tableName;
	return this;
}

init.select = function(fields){
	this.fields = fields;
	return this;
}

init.whereRaw = function(sql,values){
	this.sql_raw = {
		sql : sql,
		values : values
	};
	return this;
}

init.where = function(field,parm2,parm3){
	var tmp = {
		'field' : field,
		'action' : parm3 == undefined ? "=" : parm2,
		'value' : parm3 == undefined ? parm2 : parm3,
		'condtion': "AND"
	};
	this.where_action.push(tmp);
	return this;
}

init.orWhere = function(field,parm2,parm3){
	var tmp = {
		'field' : field,
		'action' : parm3 == undefined ? "=" : parm2,
		'value' : parm3 == undefined ? parm2 : parm3,
		'condtion': "OR"
	};
	this.where_action.push(tmp);
	return this;
}

init.groupBy = function(field){
	this.group.push(field);
	return this;
}

init.orderBy = function(o,ot){
	this.order.push({o:o,ot:ot});
	return this;
}

init.limit = function(begin,number){
	this.limit_begin = begin;
	if(number != undefined)
		this.limit_number = number;
	return this;
}

init.get = function(){
	return this.doSqlCmdAsync(buildGetSql());
}

init.insert = function(field,value){
	return this.create(field,value);
}

init.insertObj = function(insert_data_obj){
	return this.createObj(insert_data_obj);
}

init.create = function(field,value){
	this.insert_data.push({field:field,value:value});
	return this.doSqlCmdAsync(buildCreateSql());
}

init.createObj = function(insert_data_obj){
	for (var x in insert_data_obj) {
		this.insert_data.push({field:x,value:insert_data_obj[x]});
	}
	return this.doSqlCmdAsync(buildCreateSql());
}

init.update = function(field,value){
	this.update_data.push({field:field,value:value});
	return this.doSqlCmdAsync(buildUpdateSql());
}

init.updateObj = function(update_data_obj){
	for (var x in update_data_obj) {
		this.update_data.push({field:x,value:update_data_obj[x]});
	}	
	return this.doSqlCmdAsync(buildUpdateSql());
}

init.delete = function(){
	return this.doSqlCmdAsync(buildDeleteSql());
}

init.doSqlCmdAsync = function(sql){
    return mysql_func.doSqlCmdAsync(sql);
}

module.exports=init;