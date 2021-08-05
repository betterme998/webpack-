



const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/main.js',
    path:resolve(__dirname,'build')
  },
  plugins:[
    // html-webpack-plugin也可压缩html代码
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      // 压缩html代码
      minify:{
        // 移除空格
        collapseWhitespace:true,
        // 移除注释
        removeComments:true
      }
    })
  ],
  mode:'production'
}