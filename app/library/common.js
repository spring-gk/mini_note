'use strict';
var fs = require('fs'),
    path = require("path"); 
var common_func = {
    formatDate: function(){
    	//获取当前时间
    	var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	        + " " + date.getHours() + seperator2 + date.getMinutes()
	        + seperator2 + date.getSeconds();
	    
	    return currentdate;
    },
    getDate: function(){
    	//获取当前时间
    	var date = new Date();
	    var seperator1 = "-";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
	    
	    return currentdate;
    },
    getYearMonth: function(){
    	//获取当月时间
    	var date = new Date();
	    var seperator1 = "-";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = date.getFullYear() + seperator1 + month;
	    
	    return currentdate;
    },
    getIPAdress: function(){
    	//获取IP
    	var interfaces = require('os').networkInterfaces();  
	    for(var devName in interfaces){  
	          var iface = interfaces[devName];  
	          for(var i=0;i<iface.length;i++){  
	               var alias = iface[i];  
	               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
	                     return alias.address;  
	               }  
	          }  
	    }  
    },
    createFolder: function(dirname) {
    	//创建文件夹
        if (fs.existsSync(dirname)) {
          return true;
        } else {
          if (this.createFolder(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
          }
        }
	},
	trim: function(str){
		//过滤空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	generateToken: function(){
		//生成uuid token
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	}
};
module.exports=common_func;