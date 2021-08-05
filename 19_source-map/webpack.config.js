



const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // entry:'./src/js/index.js',
  entry:['./src/js/index.js','./src/index.html'],
  output:{
    filename:'js/main.js',
    path:resolve(__dirname, 'build')
  },
  module:{
    rules:[
      {
        // css资源
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        //less资源
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        //样式图片资源
        test:/\.(png|jpg|gif)$/,
        loader:'url-loader',
        options:{
          limit:8*1024,
          name:'[hash:10].[ext]',
          outputPath:'imgs',
          esModule:false
        }
      },
      {
        // html中的图片资源
        test:/\.html$/,
        loader:'html-withimg-loader',
        options:{
          esModule:false
        }
      },
      {
        // 其他资源
        exclude:/\.(png|jpg|gif|html|js|css|less)$/,
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
    port:3035,
    open:true,
    hot:true
  },
  target:"web",
  devtool:'hidden-source-map'
}

/*
  source-map: 一种提供源代码到构建后代码映射技术 （构建后的代码是所有代码的集合 如果构建后代码出错了，不易查找。通过映射可以
  追踪源代码的错误，然后可以去改源代码），非常利于我们调试，找错误的原因

  在webpack中加入 devtool:'source-map'就行(最基本配置) 会生成一个source-map文件(后缀名为map) 它提供了源代码到构建后代码的映射关系，简称为source-map

  有以下几个参数：
  [inline-|hidden-|eval-][nosources-][cheap-[mosule-]]source-map

  source-map 外部
    错误代码的精确信息 和 源代码的错误位置

  inline-source-map：内联   inline 和source-map配合使用（不会生成外部的source-map文件，但会在打包的main.js文件内生产Base64编码的source-map的文件  叫  内联的source-map文件）
  1.只生产一个内联source-map
  错误代码的精确信息 和 源代码的错误位置

  hidden-source-map 外部  hidden 和source-map配合使用
    错误代码的错误原因，但是没有错误位置
    不能追踪到源代码错误，只能提示到构建后代码错误的位置（为了隐藏源代码诞生的）

  eval-source-map   内联  eval 和source-map配合使用 （每个文件下（main.js文件内的每个文件）都会追加一个sourceMappingURL）
    错误代码的精确信息 和 源代码的错误位置

  nosources-source-map 外部
  错误代码的精确信息，但是没有任何源代码信息（为了隐藏源代码诞生的）

  cheap-source-map 外部
    错误代码的精确信息 和 源代码的错误位置
    只能精确知道那行出错

  cheap-module-source-map 外部
    错误代码的精确信息 和 源代码的错误位置
    module会将webpack的loader的source map加入

  1.每一个文件都生成对应的内联source-map
  内联 和 外部的区别：1.外部生成了文件，内联没有 2.内联构建速度更快

  以上几个参数如何使用呢
  开发环境：速度快，调试更友好
  速度快（eval>inline>cheap>...）
    eval-cheap-source-map  (eval和cheap配合使用速度最快)
    eval-source-map
  调试更友好
    source-map
    cheap-mosule-source-map
    cheap-source-map

    --》 eval-source-map (速度快，调试友好) /  eval-cheap-mosule-source-map (速度更快，调试没有前面友好)

  生产环境：源代码要不要隐藏？调试要不要更友好
  源代码要不要隐藏
    内联会让代码体积变大，所以生产环境一般不用内联
    nosources-source-map  全部隐藏
    hidden-source-map     只隐藏源代码，会提示构建后代码错误

  调试要不要更友好
    source-map

    --> source-map (调试更友好) / cheap-module-source-map
*/