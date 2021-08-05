/*
webpack.config.js  webpack配置文件
作用：指示webpack 干那些活（当你运行webpack指令时，会加载里面的配置 以里面的配置去干活）

所有构建工具都是基于node.js平台运行的~模块化默认采用commonjs

*/
// resolve用来拼接绝对路径的方法 node.js
const {resolve} = require('path');

module.exports = {
    // webpack配置
    // 入口起点 以那个文件开始打包的)(入口文件)
    entry:'./src/index.js',
    // 输出  (是一个对象 有两个属性)
    output:{
        // 指示输出的文件名
        filename:'main.js',
        // 输出路径
        // __dirname node.js的变量，代表当前文件（webpack.config.js的目录绝对路径）
        path:resolve(__dirname,'built')
    },
    // loader的配置
    module:{
        rules:[
            // 详细的loader配置
            // 不同文件要配置不同loader处理
            {
                // 1匹配那些文件  用正则表达式
                test:/\.css$/,
                // 使用那些loader进行处理
                use:[
                    // use数组中loader执行顺序：从右到左，从下到上 执行完第一个再执行第二个
                    // 3创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 2将css文件变成commonjs模块 加载到js中，里面内容是样式字符串
                    'css-loader'
                ]

                //首先匹配文件是不是样式资源1 一但是样式资源，2然后将样式资源的内容变成commonjs模块加载到js中 内容是样式字符串
                // 接着怎么生效呢  就是3创建一个style标签，再把样放到head中就生效了
            },
            // 在写一个loader处理less文件
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    // 将less文件编辑成css文件
                    // 需要下载less-loader 和 less
                    'less-loader',
                ]
            }
        ]
    },
    // plugins的配置
    plugins:[
        // 详细的plugins的配置
    ],
    // 模式
    mode:'development', //开发环境
    // mode:'productuon   生产环境'


    
}