'use strict';
var zookeeper = require('node-zookeeper-client'),
    app_config = require('../../config'),
    monitor_func = require('./monitor'),//monitor公用函数
    genericPool = require("generic-pool");

//创建连接池---begin
var zoo_factory = {
  create: function() {
    var client = zookeeper.createClient(app_config.zk_config.host,{
        //sessionTimeout: 30000, //Session timeout in milliseconds, defaults to 30 seconds.
        //spinDelay : 1000, //The delay (in milliseconds) between each connection attempts.
        retries : 100000 //The number of retry attempts for connection loss exception.
    });
    client.connect();
    client.on('connected',function() {
        monitor_func.addLog("zk_pool_client connected","zookeeper.log");
        console.log('Connected to ZK.');
    });
    client.on('state', function (state) {
        monitor_func.addLog("zk_pool_client state changed:"+JSON.stringify(state),"zookeeper.log");
        //console.log('ZK state changed:',state);
    });
    return client;
  },
  destroy: function(client) {
    monitor_func.addLog("zk_pool_client destroy","zookeeper.log");
    client.close()
  }
};
var zoo_opts = {
  max: 10, // maximum size of the pool
  min: 2 // minimum size of the pool
};
var zooPool = genericPool.createPool(zoo_factory, zoo_opts);
zooPool.on('factoryCreateError', function(err){
    monitor_func.addLog("factoryCreateError error:"+JSON.stringify(err),"zookeeper.log");
    console.log("factoryCreateError:",err);    
});

zooPool.on('factoryDestroyError', function(err){
   monitor_func.addLog("factoryDestroyError error:"+JSON.stringify(err),"zookeeper.log");
   console.log("factoryDestroyError:",err);   
});
//创建连接池---end   
//创建永久节点
var createNode = function(path){
    return new Promise(function(resolve,reject){
        zooPool.acquire().then(function(client){
            client.create(path, function (error, path) {
                zooPool.release(client);
                if (error) {
                    reject(error);
                } else {
                    resolve('Node: '+path+' is successfully created.');
                }
            });
        }).catch(function(err){
            reject(err);
        });
    });
}

//创建临时节点
var mkdirTempNode = function(path){
    return new Promise(function(resolve,reject){
        zooPool.acquire().then(function(client){
            client.mkdirp(path, undefined,zookeeper.ACL.OPEN_ACL_UNSAFE,zookeeper.CreateMode.EPHEMERAL,function(error){
                zooPool.release(client);
                if (error) {
                    reject(error);
                } else {
                    resolve('Node: '+path+' is successfully created.');
                }
            });
        }).catch(function(err){
            reject(err);
        });
    });
}

//删除节点
var removeNode = function(path){
    return new Promise(function(resolve,reject){
        zooPool.acquire().then(function(client){
            client.remove(path, function (error) {
                zooPool.release(client);
                if (error) {
                    reject(error);
                } else {
                    resolve('Node is deleted:' + path);
                }
            });
        }).catch(function(err){
            reject(err);
        });
    });
}
//获取节点数据
var getZkData = function(path,watch_callback){
    return new Promise(function(resolve,reject){
        zooPool.acquire().then(function(client){
            client.getData(path,function (event) {
                monitor_func.addLog("zk_pool_client node event changed:"+JSON.stringify(event),"zookeeper.log");
                if(event.name == "NODE_DATA_CHANGED" && event.path  == path){
                    if(typeof(watch_callback) == "function" && watch_callback != undefined){
                        zooPool.release(client);
                        watch_callback(path);
                    }
                }
            },function (error, data, stat) {
                try{
                    if (error) {
                        reject(error);
                    }else{
                        resolve(data.toString());
                    } 
                }catch(err){
                    reject(err);
                }        
            });
        }).catch(function(err){
            reject(err);
        });         
    });
}

/**
var watchData = function(path,success_callback){
    zoo_func.getZkDataAsync(path,function(w_path){
        watchData(w_path,success_callback)
    }).then(function(res){
        if(typeof(success_callback) == "function" && success_callback != undefined)
            success_callback(res);
    }).catch(function(err){
        console.log(err);
    });
}
watchData("/node.xin.com.app_list",function(res){
    console.log(res);
});
*/
/*
var export_func = {
    'createNodeAsync': async function(path){
        var res = await createNode(path);
        return res;
    },
    'mkdirTempNodeAsync': async function(path){
        var res = await mkdirTempNode(path);
        return res;
    },
    'removeNodeAsync': async function(path){
        var res = await removeNode(path);
        return res;
    },
    'getZkDataAsync': async function(path,watch_callback){
        var res = await getZkData(path,watch_callback);
        return res;
    }
};
*/
var export_func = {
        'createNodeAsync': createNode,
        'mkdirTempNodeAsync': mkdirTempNode,
        'removeNodeAsync': removeNode,
        'getZkDataAsync': getZkData
};
module.exports=export_func;