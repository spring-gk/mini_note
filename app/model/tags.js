var model_base_func = require('./model_base'),
	init = {};
//获取分页列表
init.getTagListAsync = function(page,page_size){
	return model_base_func.getDataList("node_app",page,"*","update_time desc",page_size);
}
//获取应用详细
init.getTagDetailAsync = function(tid,fields){
	return model_base_func.getDataDetail("node_app",fields,"aid = "+aid);
}

init.addTagAsync = function(title,is_able){

}

init.updateTagAsync = function(aid,update_data){

}

module.exports=init;