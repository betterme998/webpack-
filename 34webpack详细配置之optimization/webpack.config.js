

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const {resolve} = require('path');
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname,'build'),
    // 修改文件名 也可以在js文件内用魔法注释
    chunkFilename:'js/[name].[contenthash:10]_chunk.js'
  },
  module:{
    rules:[
        {
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
        },
        {
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader',
            ]
        }
    ]
},
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'production',

  // 有个小问题 就是打包后main.js,会保留a.js的哈希值，当只改变a.js时，再次打包main.js也会重新打包（因为main.js文件要引用a.js文件，所以当a.js文件改变时其hash值改变，main.js的哈希值也会变，这样main.js也就会变，因为引入的文件的哈希值变量，所以这个文件也得变，这样
  // 会导致缓存失效）
  // 解决：要将main.js文件记录的哈希值单独提取出来，单独打包，这样main.js就不记录哈希值，就不会出现问题。这个配置：
  // runtimeChunks
  optimization:{
    // 分割一些代码
    splitChunks:{
      chunks:'all',
      // 以下为默认值 可以不写
      // miniSize:30*1024,//分割的chunk最小为30kb（小于就不分割）
      // maxSize:0,//最大没有限制
      // minChunks:1,//要提前的chunk最少被引用1次
      // maxAsyncRequests:5,//按需加载时并行加载的文件最大数量为5、
      // maxInitialRequests:3,//入口js文件最大并行请求数量
      // auomaticNameDelimiter:'~',//名称连接符
      // name:true,//可以使用命名规则
      // cacheGroups:{ //分割chunk的组
      //   // node_modules文件会被打包到 verdors组的chunk中 --> vendors~xxx.js
      //   // 满足上面的公共规则，如大小超过30kb，至少被引用一次。
      //   vendors:{
      //     test:/[\\/]node_modules[\\/]/,
      //     // 优先级
      //     priority:-10
      //   },
      //   default:{
      //     // 要提取的chun最少被引用2次
      //     minChunks:2,
      //     // 优先级
      //     priority:-20,
      //     // 如果当前要打包的模块，和之前已经被提取的模块是同一个就会复用，而不会重新打包模块
      //     reuseExistingChunk:true

      //   }
      // }
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk:{
      name:entrypoint =>`runtime-${entrypoint.name}`
    },
    minimize: true,
    minimizer:[
      // 配置生产环境的压缩方案：js和css
      new TerserPlugin({
        // // 开启多进程打包
        parallel: true
      })
    ]
      
    
    
  }
}