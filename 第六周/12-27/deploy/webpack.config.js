const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let obj = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"] //这三个顺序一定要对,不然会报错
            }
        ]
    },
    plugins: [new htmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html"
    })]
}







module.exports = obj;