let http = require("http");
let fs = require("fs");

/*
    注册:
    /register?user=123   
        有没有这个人
        失败
            {
                code:0,
                msg:'有介个银了'
            }

        成功
            {
                code:1,
                msg:'可以注册'
            }
        
    localhost/register?user=123 
    localhost/index2.html

    
*/

/*
    user=123&
    pass=123&kk='yy'

    ^[^=]+=[^&]+(&|$)
    {
        user:123,
        pass:123,
        kk:'yy'
    }
*/
function queryString(str) {
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g, ($0, $1, $2) => {
        //console.log($0)
        //console.log($1);
        //console.log($2)
        obj[$1] = $2
    })
    //console.log(obj)
    return obj
}
let sql = [{
    id: 1,
    username: "德鲁斯",
    password: "123"
}, {
    id: 1,
    username: "欧斯曼",
    password: "123"
}, {
    id: 1,
    username: "Lisa",
    password: "123"
}, {
    id: 1,
    username: " 欧莱德",
    password: "123"
}]
//queryString("wd=node&rsv_spt=1")
let App = http.createServer((req, res) => {
    let url = req.url;
    console.log(url,67)
    if (url !== "/favicon.ico") {
        if (url.includes("?")) {
            let ary = url.split("?");
            let interface = ary[0];
            let params = queryString(ary[1]);
            console.log(params,73)
            switch (interface) {
                case "/getname":
                    let feedback = {
                        code: 0,
                        msg: "可以注册"
                    };
                    let f = sql.find((item) => {
                        item.username === encodeURI(params.username)
                    }); //检测用户有没有注册过
                    if (f) {
                        feedback.code = 1,
                            feedback.msg = "有这个人了"
                    }
                    res.setHeader("content-type", "text/html;charset=utf-8");
                    res.write(JSON.stringify(feedback));
                    res.end();
                    break
                case "/register":
                    let feedback1 = {
                        code: 1,
                        msg: "注册成功"
                    }
                    let f1 = sql.find((item) => {
                        item.username === decodeURI(params.username)
                    }); //检测用户有没有注册过

                    if (f1) {
                        feedback1.code = 1,
                            feedback1.msg = "有这个人了"
                    } else {
                        if (params.password) {
                            sql.push({
                                id: Date.now(),
                                username: decodeURI(params.username),
                                password: params.password
                            })
                        } else {
                            feedback1.code = 2;
                            feedback1.msg = "参数不正确";
                            res.writeHead(400, {
                                "content-type": "text/html;charset=utf-8"
                            });
                            res.write(JSON.stringify(feedback1.msg));
                            res.end();
                            return
                        }
                    }
                    res.setHeader("content-type", "text/html;charset=utf-8");
                    res.write(JSON.stringify(feedback1));
                    res.end();
                    break;
                default:
                    break
            }

        } else {
            try {
                if (url === "/") {
                    url = "/index.html";
                    let data = fs.writeFileSync("www" + url);
                    res.write(JSON.toString(data));
                    res.end();
                }
            } catch (error) {
                let data = fs.writeFileSync("www/404.html");
                res.write(JSON.toString(data));
                res.end();
            }
        }
    }
})
App.listen(81)