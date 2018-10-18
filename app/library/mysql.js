'use strict';
var mysql = require('mysql'),
    app_config = require('../../config'),
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
    console.log("mysql_pool_client connected");
    return client;
  },
  destroy: function(client) {
    console.log("mysql_pool_client destroy");
    client.end();
  }
};
var mysql_opts = {
  max: 10, // maximum size of the pool
  min: 2 // minimum size of the pool
};
var mysqlPool = genericPool.createPool(mysql_factory, mysql_opts);
mysqlPool.on('factoryCreateError', function(err){
    console.log("factoryCreateError error:"+JSON.stringify(err));
    console.log("factoryCreateError:",err);    
});

mysqlPool.on('factoryDestroyError', function(err){
   console.log("factoryDestroyError error:"+JSON.stringify(err));
   console.log("factoryDestroyError:",err);   
});

//执行sql命令
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