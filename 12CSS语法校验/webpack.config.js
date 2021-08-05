
//css压缩需要引入插件  css-minimizer-webpack-plugin 要下载 然后直接调用


const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin');
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐/
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐
// 不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐不好用不推荐

// 引入校验插件 之后定义规则集:(在package.json中的stylelint属性指定规则可如下) 和js语法校验一样
//  官网 具体在里面看 https://stylelint.io/
/* 
"stylelint":{
    "extend":"stylelint-config-standard",
    //指定义的一些指令规则集
    "rules":{
      
    }
}
*/ 
const StylelintPlugin = require('stylelint-webpack-plugin');

process.env.NODE_ENV = 'development';
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
        // css校验
        new StylelintPlugin({
            // 指定需要进行格式校验的文件 
            files:['src/css/*.{css,less,sass,scss}'],
            fix:true
        })
    ],
    mode:'development'
}