'use strict';
/**
 * 开发环境配置文件
 */
var config = {
    env: 'local', //环境名称
    port: 4000,         //服务端口号
    db_config: {
        'host': '127.0.0.1',
        'port': 3306,
        'database': 'mini_note',
        'username': 'root',
        'password': 'root'
    },
    redis_config: {     //redis配置
        'host': '127.0.0.1',
        'port': 6379
    },
    zk_config:{
        'host':"127.0.0.1:2181",
        'app_list_path': "/nodeim.app_list"
    },
    log_dir: "./logs/" //日志目录
};
module.exports=config;