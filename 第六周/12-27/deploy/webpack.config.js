let path = require("path");
let htmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
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
        devServer: {
            contentBase: path.join(__dirname, "./src"),
            historyApiFallback: true,
            inline: true,
            hot: true,
            open: true,
            port: 80
        },
        plugins: [new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })]}
        module.exports = obj