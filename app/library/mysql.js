'use strict';
var mysql = require('mysql'),
    app_config = require('../../config'),
    monitor_func = require('./monitor'),//monitor公用函数
    genericPool = require("generic-pool"),
    init = {};

//创建连接池---begin
var mysql_factory = {
  create: function() {
    var client = mysql.createConnection({
      host     : app_config.db_config.host,
      port     : app_config.db_config.port,  
      user     : app_config.db_config.username,
      password : app_config.db_config.password,
      database : app_config.db_config.database
    });
     
    client.connect();
    monitor_func.addLog("mysql_pool_client connected","mysql.log");
    return client;
  },
  destroy: function(client) {
    monitor_func.addLog("mysql_pool_client destroy","mysql.log");
    client.end();
  }
};
var mysql_opts = {
  max: 10, // maximum size of the pool
  min: 2 // minimum size of the pool
};
var mysqlPool = genericPool.createPool(mysql_factory, mysql_opts);
mysqlPool.on('factoryCreateError', function(err){
    monitor_func.addLog("factoryCreateError error:"+JSON.stringify(err),"mysql.log");
    console.log("factoryCreateError:",err);    
});

mysqlPool.on('factoryDestroyError', function(err){
   monitor_func.addLog("factoryDestroyError error:"+JSON.stringify(err),"mysql.log");
   console.log("factoryDestroyError:",err);   
});

init.doSqlCmdAsync = function(sql){
    return new Promise(function(resolve,reject){
        mysqlPool.acquire().then(function(client){
            client.query(sql,function (err, result) {
                mysqlPool.release(client);
                if(err){
                  reject(err);
                }else{
                  resolve(result);
                } 
            });
        }).catch(function(err){
            reject(err);
        });
    });
}


module.exports=init;