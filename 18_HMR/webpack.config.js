/*
  如果只有一个模块发生变化，按道理只要这一个模块发生变化就足够了，这就要用到webpack的HMR功能
  HMR:hot module replacement 热模块替换 / 模块热替换 在deServer中设置hot:true就可使用
  作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
      极大提升构建速度

      1.样式文件：可以使用HMR功能：因为style-loader内部实现了

      2.js文件：默认不能使用HMR功能的 --> 需要修改js代码，添加支持HMR功能的代码如下：
      这是入口文件引入其他文件
      import print from './print';
      // 开启JS的HMR加下面的代码
      if(module.hot){
        // 一旦module.hot为true (一旦module上有hot属性) ，说明开启了HMR功能 -->让以下HMR功能代码生效
        
        module.hot.accept('./print.js',function (){
        // 方法会监听print.js文件的变化，一旦发生变化，其他模块默认不会重新打包构建。
        // 会执行后面的回调函数 
        // 被引入的模块
        print();
  })
  // 注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。入口文件是做不了HMR的（因为入口js文件对所有其他js文件的引入，如果用HMR功能会重新加载其他文件）





}

      3.html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了（就是没有重新编译后没有自动更新）
      html文件解决办法：修改entry入口,将html文件引入, 修改后可以热更新，但还是用不了HMR功能（不用做html的HMR功能）：因为html就一个页面（部分更改还是要加载整个文件所以不设置），不像js有多个文件
*/ 


const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 原
  // entry:'./src/js/index.js',
  // 修改后
  entry:['./src/js/index.js','./src/index.html'],
  output:{
    filename:'js/main.js',
    path:resolve(__dirname, 'build')
  },
  // 配合deServer让其自动更新
  target:"web",
  module:{
    rules:[
      {
        // 处理css资源
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 处理样式资源的图片
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit:8*1024,
          name:'[hash:10].[ext]',
          outputPath:'imgs',
          esModule:false
        }
      },
      {
        // 处理html的图片
        test:/\.html$/,
        loader:'html-withimg-loader',
        options:{
          esModule:false
        }
      },
      {
        // 处理less资源
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        // 处理其他资源
        exclude:/\.(css|html|js|less|jpg|png|gif)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
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
    port:3034,
    open:true,
    // 开启HMR功能
    // 当修改了webpack了webpack配置，新配置要想生效必须重启webpack服务
    hot:true
  }
}