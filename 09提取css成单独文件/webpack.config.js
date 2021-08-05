// 打包后样式资源还在js中 所以要下载一个插件开进行提取（mini-css-extract-plugin 插件 要下载）可提取css成单独文件


const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/main.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    // 创建style标签，将样式放入
                    // 'style-loader', 要把css提取成单独文件style-loader不能用
                    // 下面这个loader取代style-loader。作用:提取js中的css成单独文件，因为已经成了单独文件所以不用创建style标签，所以style-loader就不要了
                    miniCssExtractPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        // 当css-loader整合css到js文件时通过miniCssExtractPlugin()处理把 css变成一个单独文件。所以style-loader不能用
        // 当向把提取的单独css文件放在指定的文件夹下 可传参
        new miniCssExtractPlugin({
        // 放在css文件夹下名为 main.css ,对输出的文件重命名
            filename:'css/main.css'
        })
    ],
    mode:'development'
}