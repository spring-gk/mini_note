var mysql_func = require('../library/mysql'),
	redis_func = require('../library/redis');
//登录
var login = function(username,password){
	try{
		
	}catch(e){
		
	}
}

//更新密码
var updatePwd = function(username,password){
	
}

//退出
var logout = function(username){

}

var export_func = {
    'loginAsync': login,
    'logoutAsync': logout,
    'updatePwdAsync': updatePwd
};

module.exports=export_func;