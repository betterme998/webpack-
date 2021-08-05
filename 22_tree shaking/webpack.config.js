
/*
Tree Shaking (摇树)
  .Tree Shaking 的作用是删除未引用代码(dead code)如：
    .return后面的代码
    .只声明，而未使用的函数
    .只引入，未使用的代码

  .前提：(使用tree shaking的前提)
    .使用 ES Modules 规范的模块，才能执行Tree Shaking
    .Tree Shaking 依赖于ES Modules的静态语法分析：比如(在ES Modules中引入使用的是import, 导出成员使用export。因此在程序没有执行之前就可以做一些分析，分析那些内容引入了，那些内容导出了，这是Tree Shaking技术的基础)

  .如何使用
    .生产模式： Tree Shaking会自动开启
    .开发模式： (如果想在开发模式验证Tree Shaking效果有如下两种方法)
      .usedExports  (第一种方式)
      .sideEffects  (第二种方式)

      第一种 -usedExports
        写法：需要在配置文件中指定optimization下面的usedExports
        .optimization.usedExports  (标记没有用的代码)：没有使用的代码在打包之后，前面会写一行注释//unused harmony export xxxxx (xxx是函数名/变量名)
        方法一，.optimization.minimize:ture (删除unused harmony export xxxx标记的代码)
        方法二,标记之后删除代码：使用插件：terser-webpack-plugin (删除没有用的代码 就是上面注释了的代码)根据注释//unused harmony export xxxxx 来删除
        terser-webpack-plugin在webpack4中要单独安装（webpack5无需安装）但要引入
      所以usedExports一共执行两个步骤 
        1、标记未使用的代码
        2.删除标记的未使用的代码
      有个坑：Tree Shaking 与 Source Map 存在兼容问题 (就是：如果要使用Tree Shaking那么Source Map下面的模式只能写出devtool:source-map | inline-source-map | nosources-source-map | hidden-source-map这四种当中的一个)
      .eval模式，将js输出成字符串（不是 ES Modules规范）,导致Tree Shaking失效

      第二种 -sideEffects (副作用)
      .副作用
        .无副作用：如果一个模块单纯的导入导出变量，那么就是无副作用
        .有副作用：如果一个模块还修改其他模块或者全局的一些东西，就有副作用 如：
          .修改全局变量
          .在原型上扩展方法
          .css的引入
        .sideEffects的作用：把(未使用)但(无副作用)的模块一并删除 就是：
          .对于没有副作用的模块，未使用代码不会被打包（相当于压缩了输出内容）
      用法：
      .开启副作用（webpack.config.js中声明配置项）
        .optimization:sideEffects:true
      .标识代码是否有副作用(在package.json)
        .sideEffects
          .false:所有代码都没有副作用（告诉webpack可以安全删除未用的exports）
          .true:所有代码都有副作用
          .数组：(告诉webpack那些模块有副作用，不删除)如

      

*/


const {resolve} = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// process.env.NODE_ENV = 'development';

// 复用loader 自己定义
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  // css兼容
  'postcss-loader'
]

module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/main.js',
    path:resolve(__dirname, 'build')
  },
  module:{
    rules:[
      {
        oneOf:[
                // css 
      {
        test:/\.css$/,
        use:[...commonCssLoader]
      },
       // less
       {
        test:/\.less$/,
        use:[
          ...commonCssLoader,
          'less-loader'
        ]
      },
      // js兼容性处理
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            [
              '@babel/preset-env',
              {
                useBuiltIns:'usage',
                corejs:{
                  version:3
                },
                targets:{
                  chrome:'60',
                  firefox:'60',
                  ie:'9',
                  safari:'10',
                  edge:'17'
                }
              }
            ]
          ]
        }
      },
      // 处理图片
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit: 8 * 1024,
          name:'[hash:10].[ext]',
          outputPath:'imgs',
          esModule:false
        }
      },
      // 处理html的图片
      {
        test:/\.html$/,
        loader:'html-loader',
      },
      // 处理其他资源
      {
        exclude:/\.(js|css|less|html|jpg|png|gif)$/,
        loader:'file-loader',
        options:{
          outputPath:'media'
        }
      }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackplugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
    new MiniCssExtractPlugin({
      filename:'css/main.css'
    }),
    // js语法检查
    // new EslintWebpackPlugin({
    //   fix:true
    // })
  ],
  mode:'development',
  devtool:'source-map',
  optimization:{
    // 方法一
    //标记未被使用的代码
    // usedExports:true,
    //删除 usedExports标记的未使用的代码
    // minimize:true,
    // minimizer:[new TerserPlugin()]

    // 方法二
    sideEffects:true

  }

}