var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    login = require('./app/controller/login'),
    admin = require('./app/controller/admin'),
    tags = require('./app/controller/tags'),
    statistics = require('./app/controller/statistics'),
    system = require('./app/controller/system'),
    app_config = require('./config');//配置文件

/**************  web接口 ******************/

app.get('/', function(req, res){
  //res.send("^_^ Hello ^_^");
  res.redirect('/login')
});

//外部接口
app.use('/login', login);
app.use('/admin', admin);
app.use('/tags', tags);
app.use('/statistics', statistics);
app.use('/system', system);

app.use(express.static(__dirname + '/static'));
app.set('views', './app/views');
app.set('view engine','ejs');
//监听端口，开启服务
app.listen(app_config.port || 4000);