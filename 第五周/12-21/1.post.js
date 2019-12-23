let http = require("http");
let fs = require("fs");

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

function queryString(str) {
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g, ($0, $1, $2) => {
        obj[$1] = $2
    })
    return obj
}
let App = http.createServer((req, res) => {
    let url = req.url;
   // console.log(url,30)
    if (url !== "/favicon.ico") {
        if (url.includes("/post")) {
            let str = "";// 定义了一个str变量，用于暂存请求体的信息
            req.on("data", (data) => {//// 通过req的data事件监听函数，每当接受到请求体的数据，就累加到str变量中
               // console.log(data,36)
                str += data
            })
           // console.log(str,39)
            req.on("end", () => {//传输完触发
                let params = queryString(str);
                //console.log(params,41)
                let feedback = {
                    code: 0,
                    msg: "可以注册"
                }
                let f = sql.find((item) => item.username === decodeURI(params.username));
                if (f) {
                    feedback.code = 1;
                    feedback.msg = "已有这个人了"
                };
                res.setHeader('content-type', 'text/html;charset=utf-8');
                res.write(JSON.stringify(feedback));
                res.end();
            })
        } else {
            try {
                if (url === '/') {
                    url = '/index.html';
                }
                let data = fs.readFileSync('www' + url);
                res.write(data.toString());
                res.end();
            } catch (error) {
                let data = fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end();
            }
        }

    }

}).listen(80);