//在全局对象中查找当前文件路径
console.log(__dirname)//C:\Users\Administrator\Desktop\w-12-js\第五周\12-23,当前运行文件所在的路径,不包含当前运行文件本身
console.log(__filename)//C:\Users\Administrator\Desktop\w-12-js\第五周\12-23\1.js,当前运行文件所在的路径,包含当前运行文件本身
let path = require("path")//处理路径

//path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
console.log(path.resolve("1.js"),7)//C:\Users\Administrator\Desktop\w-12-js\第五周\12-23\1.js 7
console.log(path.resolve("bar/foo","./gg"),8)//C:\Users\Administrator\Desktop\w-12-js\第五周\12-23\bar\foo\gg 8,解析成绝对路径

console.log(path.join("foo/bar","1.js"),10)//foo\bar\1.js 10,路径拼接,写啥拼啥