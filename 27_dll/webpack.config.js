// dll 动态连接库 它类似 external一样会指示webpack那些库不参与打包的，不同的是dll会单独对某些库进行单独打包，将多个库打包成一个chunk
// 将多个库打包成一个chunk 有什么意义呢：正常情况下 node 里面所有的包会被打包成一个chunk，但是我们第三方库非常非常多，如果
// 全部打包成一个文件这文件体积太大了，所以通过dll技术，将一些库单独拆开来，打包成一些不同的文件，这样更有利于我们的性能优化

// 简单来讲 就是对代码进行单独打包
// 要单独打包就需要写另外一个配置文件 (webpack.dll.js)文件名用什么名字都行 ，我们刚好用到dll技术，就叫webpack.dll.js

// 当我们使用dll做完之后呢，将来jquery（第三方库）就不需要打包啦 因为jquery（第三方库）已经打包过啦，将来源代码就只要引入
// jquery直接用就行了
// externals是彻底不打包 
// dll是只要打包一次将来就不用重复打包了
// 如果用cdn链接 建议使用externals 
// 如果不用cdn链接 而是自己服务器向外暴漏出去哪推荐使用dll


const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const {resolve} = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'built')
    },
    module:{
        rules:[
        ]
    },
    plugins:[
        new HtmlWepackPlugin({
            template:'./src/index.html'
        }),
        // 告诉webpack那些库不
        // 忽略打包第三方库（jquery）参与打包，同时使用时的名称也得变
        new webpack.DllReferencePlugin({
            // 传参数
            manifest:resolve(__dirname,'dll/manifest.json')
        }),
        // // 我们需要把之前输出出去的jquery再单独的引进了才行
        // // 将之前打包的引进来
        // // 将某个文件打包输出出去，并在html中自动引入该文件
        // new AddAssetHtmlWebpackPlugin({
        //     filepath:resolve(__dirname,'dll/jquery.js')
        // })
    ],
    mode:'production'
}