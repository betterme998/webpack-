


const {resolve} = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output:{
        filename: 'main.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            // 
            {
                // 
                exclude:/\.(css|html|js|less)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugins({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    // devServer 不属于前面的5个核心概念 要单独配置
    // 叫做  开发服务器 devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点： 只会在内存中编译打包，不会有任何输出到本地代码
    // webpack5启动devServer指令为: npx webpack server   用这个指令要下载包(webpack-dev-server) 因为是本地安装 所以用(npx) : npx webpack server 来启动
    // npx 找到webpack server然后启动
    devServer:{
        // 代表要运行项目的目录,目录是构建后项目的目录 这里是build   一般写绝对路经
        contentBase:resolve(__dirname,'build'),
        // 启动gzip压缩
        compress:true,
        // 指定开发服务器的  端口号3000 通过: http://localhost:3000/ 来访问
        port:3000,
        // 自动打开浏览器
        open:true
    }
}