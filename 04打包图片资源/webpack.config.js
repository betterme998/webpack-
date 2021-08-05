


const {resolve} = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'main.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                // 使用多个loader用use
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
           
            {
                // 处理图片可以处理样式资源的图片  处理不了html中的图片 如果要处理得再创建一个loader 
                test:/\.(jpg|png|gif)$/,
                // 使用一个loader 需要下载url-loader 和 file-loader (url-loader依赖file-loader)
                loader:'url-loader',
                options:{
                    // 图片大小小于8kb，就会被base64处理
                    // base64:优点 减少请求数量（减轻服务器压力）
                    //缺点：图片体积会更大（文件请求速度慢）
                    limit:8*1024,
                    //问题：url-loader默认使用es6模块化解析，而html-withimg-loader引人图片时是commonjs
                    // 解析时会报错：[object Module]
                    //解决:关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    // [hash:10]取图片的hash的前10位
                    // [ext]取文件原来的扩展名（jpg ，png ，....）
                    name:'[hash:10].[ext]',
                    outputPath:'imgs'
                }
            },
            {
                // 处理html中的图片
                test:/\.html$/,
                //处理html文件的img图片（负责引入img ,从而能被url-loader进行处理）
                // webpack5以上要html-withimg-loader 才能让html里的图片显示
                loader:'html-withimg-loader',

            }
        ]
    },
    plugins:[
        new HtmlWepackPlugin({
            template: './src/index.html'
        })
    ],
    mode:'development'
}