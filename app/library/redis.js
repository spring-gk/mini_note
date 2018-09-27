'use strict';
var Redis = require('ioredis'),
    app_config = require('../config'),
    monitor_func = require('./monitor'),//monitor公用函数
    genericPool = require("generic-pool");

Redis.Promise.onPossiblyUnhandledRejection(function (error) {
    console.log("onPossiblyUnhandledRejection",error);
  // you can log the error here.
  // error.command.name is the command name, here is 'set'
  // error.command.args is the command arguments, here is ['foo']
});

//redis 连接参数设置 https://github.com/luin/ioredis/blob/HEAD/API.md
var redis_connect_option = {
    'host' : app_config.redis_config.host,
    'port' : app_config.redis_config.port,
    //'retry_max_delay': 3000,
    //'max_attempts' : redis_max_attempts,
    'autoResendUnfulfilledCommands': true,
    'keyPrefix': 'node.xin.com:',
    'retryStrategy': function (times) {
        if (times % 10 == 0) {
            //重试次数 每10次刷新页面
            //io.sockets.emit("refreshPage");
        }
        // reconnect after  
        return Math.min(times * 100, 3000);
    },
    'reconnectOnError': function(err){
        console.log("reconnectOnError:",err);
    }
};
//创建redis连接池---begin
var redis_factory = {
  create: function() {
    var client = new Redis(redis_connect_option);
    client.on("reconnecting", function (err) {
        monitor_func.addLog("redis_pool_client reconnecting","redis.log");
        //fs.appendFile(xin_sys_log, '\r\n<br>' + common_func.formatDate() +"["+ server_ip +"] redis_pool_client reconnecting:"+JSON.stringify(err), 'utf8', function(err){});
        console.log("redis_pool_client reconnecting");
    });
    client.on("connect", function () {
        //fs.appendFile(xin_sys_log, '\r\n<br>' + common_func.formatDate() +"["+ server_ip +"] redis_pool_client connected", 'utf8', function(err){});
        monitor_func.addLog("redis_pool_client connected","redis.log");
        console.log("redis_pool_client connected");
    });
    client.on("error", function (err) {
    	//fs.appendFile(xin_sys_log, '\r\n<br>' + common_func.formatDate() +"["+ server_ip +"] redis_pool_client error", 'utf8', function(err){});
        monitor_func.addLog("redis_pool_client error:"+JSON.stringify(err),"redis.log");
        console.log("redis_pool_client error",err);
    });
    //监听订阅成功事件
    client.on("subscribe", function (channel, count) {
        monitor_func.addLog("subscribe success:"+channel+":"+count,"redis.log");
        console.log("subscribe success");
    });
    //监听取消订阅事件
    client.on("unsubscribe", function (channel, count) {
        monitor_func.addLog("subscribe unsubscribe:"+channel+":"+count,"redis.log");
        console.log("subscribe unsubscribe");
    });
    return client;
  },
  destroy: function(client) {
    monitor_func.addLog("redis_pool_client destroy","redis.log");
    client.disconnect()
  }
};
//连接数配置
var redis_opts = {
  max: 10, // maximum size of the pool
  min: 3 // minimum size of the pool
};
var redisPool = genericPool.createPool(redis_factory, redis_opts);

redisPool.on('factoryCreateError', function(err){
    monitor_func.addLog("factoryCreateError error:"+JSON.stringify(err),"redis.log");
    console.log("factoryCreateError:",err);   
});

redisPool.on('factoryDestroyError', function(err){
    monitor_func.addLog("factoryDestroyError error:"+JSON.stringify(err),"redis.log");
    console.log("factoryDestroyError:",err);   
});
//创建redis连接池---end   

//执行redis命令 cmd:array 
/**
[
  ['hset', 'website', 'google', 'www.g.cn'],
  ['hget', 'website','google'],
  ['set','aaa','22222'],
  ['get','aaa']
]
*/
var doRedisCmd = function(cmd){
    return new Promise(function(resolve,reject){
        redisPool.acquire().then(function(client){
            client.multi(cmd).exec(function (err, result) {
                redisPool.release(client);
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
};
//订阅消息
var subscribe = function(channel,success_callback){
    return new Promise(function(resolve,reject){
        redisPool.acquire().then(function(client){
            client.subscribe(channel);
            //收到消息后执行回调，message是redis发布的消息
            client.on("message", function (channel, message) {
                if(typeof(success_callback) == "function" && success_callback != undefined)
                    success_callback(message);
            });
            resolve(true);
        }).catch(function(err){
            reject(err);
        });
    });
}
/*
var export_func = {
    'doRedisCmdAsync': async function(cmd){
        var res = await doRedisCmd(cmd);
        return res;
    },
    'subscribeAsync': async function(channel,success_callback){
        var res = await subscribe(channel,success_callback);
        return res;
    }
};
*/
var export_func = {
    'doRedisCmdAsync': doRedisCmd,
    'subscribeAsync': subscribe
};
module.exports=export_func;