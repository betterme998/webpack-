




const HtmlWebpackPlugin = require('html-webpack-plugin');
// const EslinePlugin = require('eslint-webpack-plugin');
const {resolve} = require('path');
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/main.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      // 第一种解决方案
      // js兼容性处理：babel 要使用babel得用--> babel-loader 和 @babel/preset-env 和@babel/core (babel的核心库) 都要下载
      // 1.基本js兼容性处理 -->@babel/preset-env  (环境)
            //问题只能转换基本语法，如promise高级语法不能转换了 所以要升级如下

      // 第二种解决方案
      // 2.全部的js兼容性处理 使用--> @babel/polyfill 包 要下载  这不是插件 只要引入就能用
      //  引入：1.在源代码 index.js入口文件中引入 import '@babel/polyfill' 直接引用
      //   问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入体积太大了

      // 第三种解决方案
      // 在第一步的基础上执行下面步骤
      // 按需求加载兼容性的库 用到 -->core-js库   下载（core-js）  使用第三种方案就不能使用第二种方案
      //2.下载完成后 要配置它
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        //在options里写清楚babel的配置
        options:{
          // 预设:指示babel做怎么的语法转换，这样的兼容性处理
          // 方法一 默认情况下会传这个值：'@babel/preset-env' 非常基本的兼容性处理
        //presets:['@babel/preset-env']


          // 预设:指示babel做怎么的语法转换，这样的兼容性处理
          //方法三  
          presets:[
            // 数组
            [
              '@babel/preset-env',
              // 对象
              {
                // 按需加载
                useBuiltIns:'usage',
                // 指定core-js版本
                corejs:{
                  version:3
                },
                // 指定兼容性做到那个版本的浏览器
                targets:{
                  chrome:'60',
                  firefox:'60',
                  // ie9以上
                  ie:'9',
                  safari:'10',
                  edge:'17'
                }

              }
            ]
          ]

        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    // new EslinePlugin({
    //   fix:true
    // })
  ],
  mode:'development'
}