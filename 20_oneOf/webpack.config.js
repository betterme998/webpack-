



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
    filename:'js/main.js',
    path:resolve(__dirname, 'build')
  },
  module:{
    rules:[
      {
        // 以下loader只会匹配一个 （没有oneOf之前，每个文件会被多个loader过一遍，比如一个文件有10个loader 就会过10遍）oneOf让性能更好
        // 提升构建速度
        // 注意：不能有两个配置处理同一种类型的文件  就要把其中一个要优先执行的从oneOf中提取出来放在rules中并加入enforce:'pre' (优先执行)
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
    new EslintWebpackPlugin({
      fix:true
    })
  ],
  mode:'production'
}