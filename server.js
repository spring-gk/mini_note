var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    login = require('./app/controller/login'),
    admin = require('./app/controller/admin'),
    tags = require('./app/controller/tags'),
    statistics = require('./app/controller/statistics'),
    system = require('./app/controller/system'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app_config = require('./config');//配置文件

/**************  web接口 ******************/

app.get('/', function(req, res){
  //res.send("^_^ Hello ^_^");
  res.redirect('/login')
});
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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
app.listen(app_config.port || 4000,function(){
    console.log("app started.");
});