let express = require("express");
let router = express.Router();

router.post("/",(req,res)=>{
    let {body,sql} = req;
    //console.log(sql)
    let sole = sql.find(item=>item.user===body.user);
    let obj = null;
    if(sole){
        //登录成功这个人,就把这个人的姓名和身份存到session中
        req.session.userinfo = sole.user;
        req.session.type = sole.type;
        obj = {
            code:0,
            user:sole.user,
            type:sole.type
        }
       
    }else{
        obj ={code:1}
    }
    res.json(obj)
   
})
module.exports = router;