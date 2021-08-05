// 汇总01，02，03，04，05，06
// 开发环境的配置：能让代码运行即可
// 运行指令：一，webpack   会将打包结果输出出去
//          二，npx webpack server  只会在内存中编译打包，没有输出
//  ctrl+c 在终端中结束批处操作


const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output:{
        // 打包后放在js文件下 叫main.js
        filename:'js/main.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                // 处理css资源·
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 处理样式资源中的图片·
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    limit:8*1024,
                    name:'[hash:10].[ext]',
                    esModule: false,
                    outputPath:'imgs'
                }
            },
            {
                 // 处理样html的图片· 
                test:/\.html$/,
                loader:'html-withimg-loader',
                options:{
                    esModule:false
                }
            },
            {
                // 处理less资源· 因为样式资源会因为css-loader的原因 把样式文件打包到js中 所以样式并不会输出，和js文件融为一体了
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
                
            },
            {
                // 处理其他资源·
                exclude:/\.(css|html|js|less|jpg|png|gif)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    // outputPath 这些资源打包后放到media文件下
                    outputPath:'media'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    devServer:{
        contentBase:resolve(__dirname,'build'),
        compress:true,
        port:3033,
        open:true
    }
}