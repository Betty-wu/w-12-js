let express = require("express"),
  fs = require("fs"),
  path = require("path"),
  bodyParser = require("body-parser"),
  session = require("express-session");
app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("www"));
app.use(session({
  secret: '12',
  name: "session_id",
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: true,
  rolling: true
}))

/* 用户登录注册的接口:
   
  1./getname  先判断用户是否存在,存在就登录,不存在就注册

  2.注册:/register 

  3.登录:/login
*/
let sql = [{
  id: 0,
  user: "apple",
  pw: "123"
}]
//登录接口
let reg = new RegExp(/^[a-zA-Z]\w{3,11}$/) //用户名的名字得符合正则
app.post("/getname", (req, res) => {
  console.log(req.body)
  //console.log(req.body, 26)
  let {
    body
  } = req;
  let feedback = {}
  if (body.user && reg.test(body.user)) {
    let t = sql.find(item => item.user === body.user);
    if (t) {
      feedback.code = 1;
      feedback.msg = "已注册请登录"
    } else {
      feedback.code = 0;
      feedback.msg = "可以注册"
    }
  } else {
    feedback.code = 2;
    feedback.msg = "请输入正确参数"
  }
  //console.log(feedback, 45)
  res.json(feedback)
})
//注册接口
app.post("/register", (req, res) => {
  console.log(req.query)
  let {
    body: {
      id,
      user,
      pw
    }
  } = req;
  let feedback1 = {}
  if (user && pw) {
    feedback1.code = 1;
    feedback1.msg = "注册成功";
    sql.push({
      id,
      user,
      pw
    })
  } else {
    feedback1.code = 0;
    feedback1.msg = "请正确输入参数";
  }
  res.json(feedback1)
})

//登录接口
app.use("/login", (req, res) => {
  let {
    body: {
      user,
      pw,
      id
    }
  } = req;
  let feedback2 = {}
  if (user && pw) {
    let t = sql.find(item => item.user === user);
    //console.log(t,88)
    if (t && t.pw === pw) {
      feedback2.code = 1;
      feedback2.msg = "登录成功",
        req.session.userInfo = user;
    } else {
      feedback2.code = 0;
      feedback2.msg = "用户名或密码错误"
    }
  } else {
    feedback2.code = 2;
    feedback2.msg = "请核对用户信息"
  }
  res.json(feedback2)
})
//用户是否登陆过,需要在用户登录成功时,将用户信息进行本地存储








app.listen(80)