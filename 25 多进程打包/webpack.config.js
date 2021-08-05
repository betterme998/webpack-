/*
js主线程是单线程的同一时间只能干一件事，如果事情比较多就会等很久很久才能干下一件事，会比较慢
 可以通过多进程来优化打包速度，同一时间两个进程 三个进程来干一件事就更快一些

 多进程打包怎么用？
  1.首先下载一个 thread-loader
      启动多进程： 哪里要使用多进程就把thread-loader放哪里
      一般thread-loader 是用在babel-loader上
*/ 

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {resolve} = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader'
]
process.env.NODE_ENV = 'development';

module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/build.js',
    path:resolve(__dirname, 'build'),
  },
  module:{
    rules:[
      {
        oneOf:[
          {
            // css
            test:/\.css$/,
            use:[...commonCssLoader]
          },
          {
            // less
            test:/\.less$/,
            use:[
              ...commonCssLoader,
              'less-loader'
            ]
          },
          {
            // js兼容性处理
            test:/\.js$/,
            exclude:/node_modules/,
            use:[
              // 开启多进程打包
              // 多进程用好了速度就快，没用好就非常慢
              // 因为进程开启是有时间的（启动时间大概为600ms，进程通信也要花时间）
              // 比如 这个事只要100ms就完成了，如果把它交给过进程，那么开启多进程就要600ms
              // 只有工作消耗时间比较长，才需要多进程打包
              // 因为开发时js代码是最多的
              // js里有一个eslint（语法检查），有一个babel-loader（要进行编译，转换 所以消耗时间长）、
              // babel-loader是我们工作时间最长的loader，所以我们加上thread-loader
              // 启动进程会以cpu核数减一的数量启动进程，也可以手动调整如：

              // 如果想对其他loader也做这样的处理那么把thread-loader放那个loader后面 就像处理babel-loader一样
              // 但是一定要 小心使用 因为thread-loader开销很大 

              // 调整进程
              // {
              //   loader:'thread-loader',
              //   options:{
              //     Workers:2 //进程2个
              //   }
              // },

              // 不调整进程
              'thread-loader',
              {
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
              }
            ]
          },
          {
            // 处理图片
            test:/\.(jpg|png|gif)$/,
            loader:'url-loader',
            options:{
              limit:8 * 1024,
              name:'[hash:10].[ext]',
              outputPath:'imgs',
              esModule:false
            }
          },
          {
            // 处理html图片
            test:/\.html$/,
            loader:'html-loader',
          },
          {
            // 处理其他资源
            exclude:/\.(js|css|html|less|jpg|png|gif)$/,
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
      filename:'css/index.css'
    })

  ],
  mode:'development'
  
}