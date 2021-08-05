
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/[name].js',
    path:resolve(__dirname,'build')
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
        {
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader',
            ]
        }
    ]
},
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development',
  resolve:{
    alias:{
      $css: resolve(__dirname,'src/css')
    },
    extensions:['.js','.json'],
    modeles:[resolve(__dirname,'../../node_modules'), 'node_modules']
  },

  // 一定用于开发服务器
  devServer:{
    // 运行代码的目录
    contentBase: resolve(__dirname,'build'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会reload(重新载入，重新做一些事情)
    watchContentBase:true,
    watchOptions:{
          // 忽略文件，因为我们监视的是源代码，所有要忽略node_modules里的东西
      ignored:/node_modules/
    },
    // 启动gzip压缩
    compress:true,
    //端口号
    port:5000,
    // 域名
    host:'localhost',
    // 自动打开浏览器
    open:true,
    // 开启HMR功能
    hot:true,
    // 不要显示启动服务器日志信息
    clientLogLevel:'none',
    // 除了一些基本启动信息以外，其他内容都不需要显示
    quiet:true,
    // 如果出现错误，不要全屏提示
    overlay:false,
    // 服务器代理 --> 解决开发环境跨域问题
    Proxy:{
      // 一旦devServer(5000)服务器接受到/api/xxx 的请求，就会把请求转发到另外一个服务器（3000）
      '/api':{
       target:'http://localhost.3000',
      //  发送请求时，请求路径重写： 将/api/xxx  改成--> /xxx （就是去掉/api） 路径重写
       pathRewrite:{
         '^/api':''
       }
      }
    }
  }
}