let http = require("http"),
    fs = require("fs"),
    url = require("url"),
    qs = require("querystring");
let app = http.createServer((req, res) => {
    // console.log(url.parse(req.url))
    // console.log(req.headers)
    let allowOrigin = ["http://localhost:81"] //跨域白名单
    //解决跨域
    if (allowOrigin.includes(req.headers.origin)) {
        //向请求的客户端发送响应头
        res.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": req.headers.origin //允许该源跨域请求
        })
    }
    let lastName = ["\.js$", "\.css$", "\.less$", "\.html$", "\.jpg$"]
    let reg = new RegExp(lastName.join("|"))
    let {
        query,
        pathname
    } = url.parse(req.url);
    if (pathname === "/") {
        let data = fs.readFileSync("www/index.html");
        res.end(data.toString())
    } else if (reg.test(pathname)) { //文件为静态文件
        try {
            let data = fs.readFileSync("www" + pathname);
            res.end(data.toString())
        } catch (error) {
            let data = fs.readFileSync("www/404.html");
            res.end(data.toString())
        }
    } else {
        switch (pathname) {
            case "/add": //创建新文件夹接口
                // console.log(qs.parse(query),38)
                //console.log(query)
                let {
                    mkdirname
                } = qs.parse(query);
                fs.mkdir("www/" + mkdirname + "/", (err) => {
                    // console.log(err)
                    if (err) {
                        if (err.code = "EEXIST") {
                            fs.readdir("www", (err, fileAry) => { //读取www文件夹下的所有文件
                                //console.log(fileAry)
                                let t = fileAry.includes(mkdirname);
                                let num = 0;
                                let rename = "";
                              
                                while (t) {
                                    rename = mkdirname.replace(/\(\d+\)/,'');
                                    
                                    t =  fileAry.includes(rename + '('+ (++num) +')');
                                    //console.log(rename + "(" + (++num) + ")")
                                    rename = rename + '('+ (num) +')';
                                    console.log(rename)
                                    console.log(num)
                                }
                                fs.mkdir("www/" + rename + "/", (err) => {
                                    res.end(JSON.stringify({
                                        code: 1,
                                        msg: "创建成功ok"
                                    }))
                                })

                            })
                            
                        }
                        return;
                    }
                    res.end(JSON.stringify({code:1,msg:'创建文件夹成功'}));
                })
                break;
                case "/newname":
                    if(/^post$/i.test(req.method)){
                        let str = '';
                        req.on("data",(data)=>{
                            str+=data
                        })
                    }
       



                    break;
        }
    }
})
let port = 80
app.listen(80)
app.on("error", (e) => { //解决端口被占用问题
    //console.log(e)
    if (e.code === "EADDRINUSE") { //EADDRINUSE意思:给定的地址已经被使用
        port++;
        app.listen(port)
    }
})