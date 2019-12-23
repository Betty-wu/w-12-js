let http = require("http");
let fs = require("fs");
let App = http.createServer((req, res) => {
    console.log(req.url)
    try {
        let url = req.url
        if (url === "/") {
            url = "/index.html"
        }
        let data = fs.readFileSync("www" + url);
        //console.log(data.toString(), 11)
        res.write(data.toString());
        res.end()
    } catch (error) {
        let data = fs.readFileSync("www"+"/404.html");
        res.write(data.toString());
        res.end()
    }
    let d = "这是通过fs.writeFile写入的内容"
    fs.writeFileSync("www/1.txt",d,function(err,data){
        if(err){
          console.log(err)
        }else{
            console.log("写入成功",24)
        }
    })
    fs.appendFile("www/1.txt","追加内容",function(err,data){
        if(err){
            console.log(err)
          }else{
              console.log("追加成功",31)
          }
    })

}).listen(80)