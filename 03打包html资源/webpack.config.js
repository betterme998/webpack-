
/*
loader: 1下载 2使用（配置loader）
plugins:1下载 2引入 3使用  （plugins 插件）

*/


const {resolve} = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin'); //因为这里HtmlWepackPlugin是构造函数 所以要new HtmlWepackPlugin（）就可以使用
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:resolve(__dirname,'built')
    },
    module:{
        rules:[
            // loader的配置
        ]
    },
    plugins:[
        // plugins的配置
        // 插件叫  html-webpack-plugin
        // 1引入插件
        // 功能：默认会创建一个空html文件，自动引入打包输出的所有资源（js/css）
        // 需求: 需要有结构的html文件
        new HtmlWepackPlugin({
            //复制一个./src/index.html文件,并自动引入打包输出的所有资源（js/css/json/less/....）
            template:'./src/index.html'
        })
    ],
    mode:'development'
}