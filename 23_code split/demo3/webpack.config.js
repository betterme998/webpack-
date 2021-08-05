


const {resolve} = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');

module.exports = {
  //现实中单入口多一些
  // 单入口
  entry:'./src/js/index.js',
  // entry:{
  
  //   main:'./src/js/index.js',
  //   test:'./src/js/math.js'
  // },
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname, 'build')
  },
  plugins:[
    new HtmlWebpackplugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
  ],
  // 单入口只能做一件事
  //*1.可以将node_modules中代码单独打包一个chunk最终输出 */

  /*
    如果单入口想单独打包除node_modules中之外的文件
  */
   optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production'

}