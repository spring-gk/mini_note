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

/*var common_func = require('./app/library/common');
console.log(common_func.generateToken());*/
var orm_func = require('./app/library/orm');
//var sql = orm_func.useTable("test").where('id',1).where('aa','>',1).orWhere('cc','!=',1).delete();
//var sql = orm_func.useTable("test").where('id',1).where('aa','>',1).orWhere('cc','!=',1).updateObj({xx:11,ww:22});
//var sql = orm_func.useTable("test").where('id',1).where('aa','>',1).orWhere('cc','!=',1).update("qqq",111);
//var sql = orm_func.useTable("test").create('qqqq',111);
//var sql = orm_func.useTable("test").createObj({xx:11,ww:22});
//var sql = orm_func.useTable("test").select("aaa,cc,vvv,sss").where('id',1).orWhere('cc','!=',1).groupBy('aa').groupBy('cc').orderBy('aa','asc').orderBy('xx','desc').limit(10,20).get();
//var sql = orm_func.whereRaw("SELECT * FROM test where id=? AND cc>?",[1,222]).get();
var sql = orm_func.useTable("test").insert('qqqq',111);
//var sql = orm_func.useTable("test").insertObj({xx:11,ww:22});
console.log(sql);