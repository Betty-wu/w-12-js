let express = require("express"),
    app = express(),
    fs = require("fs"),
    bodyParser = require("body-parser");
//urlencoded:对body中的数据转换成UTF-8的编码的数据
//extended: false：表示使用系统模块querystring来处理,extended: true：表示使用第三方模块qs来处理
app.use(bodyParser.urlencoded({extended:false}));
//将静态资源文件所在的目录作为参数传递给 express.static中间件就可以提供静态资源文件的访问app.use(express.static(path.join(__dirname, 'www')));
let s = express.static("www");
app.use(s);
//app.use(express.static(path.join(__dirname, 'www')));
//登录接口,get请求
app.get("/login",(req,res)=>{
    //console.log(req.query)
    if(req.query.user="apple"){
        res.send({
            code:0,
            msg:"ok"
        })
    }
})
//注册接口,post请求
app.post("/register",(req,res)=>{
    console.log(req.body)
    res.send({
        code:0,
        msg:"ok"
    })
})
app.listen(80)