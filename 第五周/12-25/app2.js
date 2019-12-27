let express = require("express");
/* Express默认并不处理HTTP请求体中的数据，对于普通请求体(JSON、二进制、字符串)数据，可以使用body-parser中间件。而文件上传(multipart/form-data请求)，可以基于请求流处理，也可以使用formidable模块或Multer中间件。 */
let bodyParser = require("body-parser");
let app = express();
let multer  = require('multer');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("www"));
app.use(multer({ dest: 'uploads/'}).array('filename'));//dest默认存储位置,array接收多个文件上传
app.use("/upload",require("./router/upload/upload"));
app.listen(88);
