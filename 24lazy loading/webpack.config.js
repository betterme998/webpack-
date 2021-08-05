
/*
  lazy loading 是js的懒加载（延迟加载：要触发某些条件的时候才会加载）
*/ 
const {resolve, dirname} = require('path')
const HtmlWebpackplugin = require('html-webpack-plugin');
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname, 'buile')
  },
  plugins:[
    new HtmlWebpackplugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production'
}