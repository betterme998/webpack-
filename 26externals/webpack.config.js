
// externals  作用防止将某一些包打包到我们最终输出的build文件夹中，比如我们用了jQuery，我们希望jQuery是通过cdn链接引入进来
// 这时就可以通过 externals把它给禁止掉,禁止了就不会被打包了,那么我们就可以在cdn链接中使用jQuery
// 设置了之后(比如忽略jquery) 要在html文件内使用cdn引入 


const {resolve} = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
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
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit:8*1024,
          esModule:false,
          name:'[hash:10].[ext]',
          outputPath:'imgs'
        }
      },
      {
        test:/\.html$/,
        loader:'html-withimg-loader'
      }
    ]
  },
  plugins:[
    new HtmlWepackPlugin({
      template:'./src/index.html'
    })
  ],
  // 环境调为生产模式
  mode:'production',
  // 加一个externals选项
  // 如果有些包需要通过cdn引进来那么就可以通过externals拒绝它们打包,如何再在html中通过script方式将这些包引进来即可
  externals:{
    // 忽略的库名 --npm包名
    // 拒绝jQuery被打包进来
    jquery:'jQuery'
  }
}