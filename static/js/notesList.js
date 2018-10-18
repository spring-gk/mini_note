layui.use(['form','layer','laydate','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        laytpl = layui.laytpl,
        table = layui.table;

    //新闻列表
    var tableIns = table.render({
        elem: '#tagsList',
        url : '/notes/data',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limit : 10,
        limits : [5,15,20,25],
        id : "tagsListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'tid', title: 'ID', width:60, align:"center"},
            {field: 'title', title: '标签名称', align:'center'},
            {field: 'is_able', title: '是否可用', align:'center', templet:function(d){
                var checked = d.is_able == 1 ? "checked" : "";
                return '<input type="checkbox" name="is_able" data-id="'+d.tid+'" lay-filter="is_able" lay-skin="switch" lay-text="是|否" '+checked+'>'
            }},
            
            {field: 'update_time', title: '更新时间', align:'center', templet:function(d){
                return d.update_time.substring(0,16);
            }},
            {title: '操作', width:170, templet:'#tagsListBar',fixed:"right",align:"center"}
        ]]
    });

    //是否可用
    form.on('switch(is_able)', function(data){
        var tid = data.elem['attributes']['data-id']['value'];
        var is_able = data.elem.checked;
        var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        $.post("/notes/doAction",{tid:tid,is_able:is_able,action_type:"doIsAble"},function(res){
            layer.close(index);
            if(res&&res.code==1){
                if(data.elem.checked){
                    layer.msg("设置可用成功！");
                }else{
                    layer.msg("设置不可用成功！");
                }
            }else{
                layer.msg(res.msg);
            }
        },"json");
    })

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        if($(".searchVal").val() != ''){
            table.reload("newsListTable",{
                page: {
                    curr: 1 //重新从第 1 页开始
                },
                where: {
                    key: $(".searchVal").val()  //搜索的关键字
                }
            })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });

    //添加文章
    function addNews(edit){
        var index = layui.layer.open({
            title : edit ? "编辑标签" :"添加标签",
            type : 2,
            content : "/notes/handle",
            success : function(layero, index){
                var body = layui.layer.getChildFrame('body', index);
                if(edit){
                    body.find(".title").val(edit.title);
                    body.find(".tid").val(edit.tid);
                    /*body.find(".newsName").val(edit.newsName);
                    body.find(".abstract").val(edit.abstract);
                    body.find(".thumbImg").attr("src",edit.newsImg);
                    body.find("#news_content").val(edit.content);
                    body.find(".newsStatus select").val(edit.newsStatus);
                    body.find(".openness input[name='openness'][title='"+edit.newsLook+"']").prop("checked","checked");
                    body.find(".newsTop input[name='newsTop']").prop("checked",edit.newsTop);*/
                    form.render();
                }else{
                    body.find(".tid").val(0);
                }
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addNews_btn").click(function(){
        addNews();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('newsListTable'),
            data = checkStatus.data,
            newsId = [];
        if(data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].newsId);
            }
            layer.confirm('确定删除选中的文章？', {icon: 3, title: '提示信息'}, function (index) {
                // $.get("删除文章接口",{
                //     newsId : newsId  //将需要删除的newsId作为参数传入
                // },function(data){
                tableIns.reload();
                layer.close(index);
                // })
            })
        }else{
            layer.msg("请选择需要删除的文章");
        }
    })

    //列表操作
    table.on('tool(tagsList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此标签？',{icon:3, title:'提示信息'},function(index){
                var index = layer.msg('处理中，请稍候',{icon: 16,time:false,shade:0.8});
                $.post("/notes/doAction",{tid:data.tid,action_type:"doDel"},function(res){
                    layer.close(index);
                    if(res&&res.code==1){
                        tableIns.reload();
                    }else{
                        layer.msg(res.msg);
                    }
                },"json");
            });
        } else if(layEvent === 'look'){ //预览
            layer.alert("此功能需要前台展示，实际开发中传入对应的必要参数进行文章内容页面访问")
        }
    });

})