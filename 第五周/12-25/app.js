let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"), //使post请求能够用req.body
    session = require("express-session");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); //使post请求能够获取body里的数据
app.use(express.static("www")); //静态资源直接找www文件夹里的
app.use(session({
    secret: '12期',
    name: 'session_id',
    cookie: {
        maxAge: 5000
    },
    resave: false,
    saveUninitialized: true
}))
let sql = [{
    id: 0,
    user: "Lisa",
    type:0
}, {
    id: 1,
    user: "Tom",
    type: 1
}, {
    id: 2,
    user: "Tony",
    type: 2
}, {
    id: 3,
    user: "Lucy",
    type: 3
}, {
    id: 4,
    user: "Lily",
    type: 4
}]
app.use("/",(req,res,next)=>{
  
    req.sql = sql;
   // console.log(req.sql)
    if(req.session.userinfo||req.url ==="/login2"){
        next()//条件成立,调用next才能执行下面的代码
    }else{
        res.json({code:100})
    }
})
//使用/getary路由
app.use("/getary", require("./router/data/getary"));
//使用/noloading路由
app.use("/noloading", require("./router/data/noloading"));
app.use("/login",require("./router/user/login"));
app.use("/login2",require("./router/user/login2"));




app.listen(80)