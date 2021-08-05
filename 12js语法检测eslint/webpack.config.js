//webpack5 语法检测用 EslintWebpack 插件 引入后直接调用 可看官方文档


const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')
process.env.NODE_ENV = 'development';
// 引入eslint的插件
const EslintPlugin = require('eslint-webpack-plugin');
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/main.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            /*
            语法检查：我们在团对工作的时候，希望写的代码风格是一样的，这时我们就可以用语法检查，能规范怎么写代码，如果写的
                不一样就会报错，最后让所有人的代码风格是最类似的，
                同时还能检测一些常见的语法错误，让代码不容易出问题。


                最常用的工具：eslint(专门用来做语法检查)  webpack5要使用得 使用EslintWebpack  下载插件 （eslint和   (eslint-webpack-plugin) 用于替代eslint-loader(即将废弃)
                注意：只检查自己写的源代码，第三方的库是不检查的
                设置检查规则：
                在package.json中的eslintConfig中设置——
                推荐使用airbnb规则 (风格指南)-->要使用airbnb需要下载3个库 (在npmjs.com网站收拾airbnb 可以看见)
                1.eslint-config-airbnb-base 支持es6+的语法规范 就不用每一项都去配置了
                2.eslint  
                3.eslint-plugin-import用于在webpack.json中读取eslintConfig配置项


                补充（
                
                5、eslint-import-resolver-webpack（如果在webpack.config.js中配置了alias 并且在import时使用了别名需要安装这个）
                ）

                然后在eslintConfig中想办法继承eslint-config-airbnb-base的风格指南
                "eslintConfig":{
                    // 通过extends继承airbnb-base库提供的检查
                    "extends":"airbnb-base",
                }
            */
                {
                    test:/\.css$/,
                    use:[
                        miniCssExtractPlugin.loader,
                        'css-loader',
                        // webpack5版本的写法
                        'postcss-loader'
                    ]
                },
                {
                    test:/\.html$/,
                    loader:'html-withimg-loader'
                },
                {
                    test:/\.(jpg|png|gif)$/,
                    loader:'url-loader',
                    options:{
                        limit:8*1024,
                        esModule: false,
                        name:'[hash:10].[ext]'
                    }
                }
            ]
        
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new miniCssExtractPlugin({
            filename:'css/main.css'
        }),
        // 压缩css
        new CssMinimizerPlugin(),
        new EslintPlugin({
            // 自动解决常规的代码格式报错
            fix:true
        })
    ],
    mode:'development'
}