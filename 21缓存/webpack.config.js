
// babel缓存 和资源缓存
// 要看缓存得 写服务器代码 server.js


const {resolve} = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
// 定义nodejs的环境变量：决定使用browserslist的那个环境 (在webpack.config.js)
// process.env.NODE_ENV = 'development';

// 复用loader 自己定义
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  // css兼容
  'postcss-loader'
]

/*
  正常来说.一个文件只能被一个loader处理
  当一个文件要被多个loader处理那么一定要指定loader的执行顺序
  先执行eslint 在执行babel :
  用enforce:'pre' 优先执行
*/ 


module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname, 'build')
  },
  module:{
    rules:[
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
          ],
          // 开启babel缓存
          // 第二次构建，会读取之前的缓存
          cacheDirectory:true
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
        loader:'html-withimg-loader',
      },
      // 处理其他资源
      {
        exclude:/\.(js|css|less|html|jpg|png|gif)/,
        loader:'file-loader',
        options:{
          outputPath:'media'
        }
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
      filename:'css/[name].[contenthash:10].css'
    }),
    // js语法检查
    new EslintWebpackPlugin({
      fix:true
    })
  ],
  mode:'production',
  // devServer:{
  //   contentBase:resolve(__dirname,'build'),
  //   compress:true,
  //   port:3035,
  //   open:true
  // }
}