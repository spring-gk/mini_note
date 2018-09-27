'use strict';
/*监控相关公用*/
var fs = require('fs'),
    common_func = require('./common'),
    server_ip = common_func.getIPAdress(), //server端IP 
    app_config = require('../../config');
    
//获取公用文件路径
var getFilePathCommon = function()
{
    var path = app_config.log_dir + common_func.getYearMonth() + "/" + common_func.getDate();
    //console.log(path);
    common_func.createFolder(path);
    return path;
}    
//写入文件消息
var writeFileMessage = function(message,filename)
{
    fs.appendFile(filename, '\r\n<br>' + common_func.formatDate() +"["+ server_ip +"]：" + message, 'utf8', function(err){
        //console.log(err);
    });
}

//对外方法
var export_func = {
    //添加一般日志
    addLog: function(message,filename){
        if(filename != undefined && filename != ""){
            var filename = getFilePathCommon() +"/"+ filename;
        }else{
            var filename = getFilePathCommon() + "/msg.log";
        }
        
        writeFileMessage(message,filename);
    },
    //添加系统日志
    addSysLog: function(message){
        var filename = getFilePathCommon() + "/sys.log";
        writeFileMessage(message,filename);
    },
    //添加客户端日志
    addClientLog: function(message,filename){
        if(filename != undefined && filename != ""){
            var filename = getFilePathCommon() +"/"+ filename;
        }else{
            var filename = getFilePathCommon() + "/client.log";
        }
        writeFileMessage(message,filename);
    },
    //添加错误日志
    addErrorLog: function(message){
        var filename = getFilePathCommon() + "/error.log";
        writeFileMessage(message,filename);
    },
    //发送邮件
    sendEmail:function(receive_email,message,cc_email){
        
    },
    //发送手机短信
    sendMobileMsg:function(mobile,message){
        
    }
};
module.exports=export_func;