const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入插件
const CssMinimizerPlugin  = require('css-minimizer-webpack-plugin')
//引入eslint代码检测插件
// const EslintPlugin = require('eslint-webpack-plugin')

process.env.NODE_ENV = 'development'
module.exports = {
  entry: './src/js/index.js',
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
                test:/\.(jpg|png|gif)$/,
                   loader:'url-loader',
                   options:{
                    limit:8*1024,
                    name:'[hash:10].[ext]',
                    // 是再图片路径之前加上的部分
                    publicPath:'../imgs',
                    // // 输出路径 要加上输出路径
                    esModule: false,
                    outputPath:'imgs',
                }
            },
            {
                test:/\.html$/,
                loader:'html-withimg-loader',
                options:{
                    esModule: false,
                }
            },
            {
                // 处理其他资源·
                exclude:/\.(css|html|js|less|jpg|png|gif)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    // outputPath 这些资源打包后放到media文件下
                    outputPath:'media',
                    publicPath:'../media'
                }
            },
            // 配置js兼容性处理
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    presets:[
                      [
                        '@babel/preset-env',
                        {
                          useBuiltIns:'usage',
                          corejs:{
                            version:3
                          },
                          targets:{
                            chrome:'60',
                            firefox:'60',
                            ie:'9',
                            safari:'10',
                            edge:'17'
                          }
          
                        }
                      ]
                    ]
          
                  }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
              collapseWhitespace:true,
              removeComments:true
            }
        }),
        new miniCssExtractPlugin({
            filename:'css/main.css'
        }),
        // 压缩css
        new CssMinimizerPlugin(),
        // new EslintPlugin({
        //     fix:true
        // }) 
    ],
    mode:'development'
}