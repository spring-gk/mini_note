'use strict';
/**
 * 开发环境配置文件2
 */
var config = {
    env: 'development', //环境名称
    port: 4000,         //服务端口号
    db_config: {
        'host': '127.0.0.1',
        'port': 6379,
        'database': 'nodeim',
        'username': 'root',
        'password': ''
    },
    redis_config: {     //redis配置
        'host': '127.0.0.1',
        'port': 6379
    },
    zk_config:{
        'host':"127.0.0.1:2181",
        'app_list_path': "/nodeim.app_list"
    },
    log_dir: "/data1/logs/app/nodejs/" //日志目录
};
module.exports=config;