// 代码分割有很多种做法 demo1（第一种做法）
// code-split 代码分割 （重点）
// 将我们打包输出的一个文件，分割成多个文件，这样就可以实现各项功能：如分成3个文件，可并行加载从而速度更快，分成更多的文件可实现按需加载（要用的时候加载，不用的时候不加载）
/*譬如：今后开发单页面应用的时候，我们整个页面是一个非常庞大的一个文件，那么我们肯定要按照路由拆分一些不同文件从而实现按需加载，要拆分文件要用
webpack技术-->代码分割
*/


const {resolve} = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');

module.exports = {
  // 当有多个js文件，且想打包后也是多个文件 可以从入口文件入手（入口的值可以是一个对象）
  // 单入口
  // entry:'./src/js/index.js',
  entry:{
    // 多入口：特点 有几个入口，最终输出就是几个bundle.js
    // 因为是两个入口所有index.js不用引入math.js
    // main 和 test 是打包后 [name]的值 
    //多入口不是很灵活（js多了就不方便 ）所以有第两种方法（demo2）
    main:'./src/js/index.js',
    test:'./src/js/math.js'
  },
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
  //*1.可以将node_modules中代码单独打包一个chunk最终输出 */
  // 2.自动分析多入口chunk中，有没有公共的文件（这个文件要有几十kb 不能太小,默认20kb），如果有会打包成单独一个chunk 

  /* 
    如果应用是单页面应用，加上下面代码 会将node_modules中的代码单独打包一个chunk最终输出

    如果是个多页面应用，是多入口它会帮你自动分析这多入口里面的依赖，会把它提起成一个chunk，就不会重复的加载一些相应的东西了
    多入口也会将node_modules中的代码单独打包成一个chunk
  */ 
  
   optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production'

}