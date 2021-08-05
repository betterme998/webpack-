
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

/*
  entry:入口起点
  它的值有三种情况
    1.string --> './src/index.js',
    单入口
      通常是指定一个js文件作为入口
      特点：
        打包形成一个chunk。输出一个bundle文件（这里built.js是bundle文件）
        // filename可以传一个name,输出的结果叫main 此时chunk的名称默认是main

    多入口
    2,array --> ['./src/index.js','./src/add.js']
      作为一个数组可以传多个文件
      所以入口文件最终自会形成一个chunk，输出出去只有一个bundle文件。
      当多入口的文件不用再js文件中引入
      这种写法有什么用呢：
        在做HMR功能中，html文件不能热更新了，所以需要在入口文件引进来，引进来之后webpack就会对它处理，处理的时候就会热更新
          --> 只有在HMR功能中让html热更新生效（一般不会使用第二中方案，使用的话是在开发模式下，让html热更新生效）

    3.object
        对象有一个key：value  key是一个名称，value是一个文件路径
        多入口
        特点：
        有几个入口文件，就形成几个chunk，同时输出出去就有几个bundle文件
        此时chunk的名称是 key （key叫index，chunk就叫index。 key叫add，chunk就叫add）
  
        特殊用法：在第三种对象用：key对应一个数组，数组引入多个值
            entry:{
              所以入口文件最终自会形成一个chunk，输出出去只有一个bundle文件。
              这种以数组的形式出现在对象中可参考 dll -->一些类似的库 可打包成一chunk
              index:['./src/index.js', './src/count.js'],
              // 形成一个chunk,输出一个bundle文件
              add:'./src/add.js'
            },

  第一种 和 第三种用的比较多，第二种用在特殊情况
*/ 
module.exports = {
  // entry:'./src/index.js',                    //1 string
  // entry:['./src/index.js','./src/add.js'],   //2 array
  // entry:{                                    //3 object 
  //   index:'./src/index.js',
  //   add:'./src/add.js'
  // },
  entry:{
    index:['./src/index.js', './src/count.js'],
    add:'./src/add.js'
  },
  output:{
    // filename可以传一个name,输出的结果叫main
    filename:'[name].js',
    // filename:'built.js',
    path:resolve(__dirname,'build')
  },
  plugins:[
    // 直接写会自动创建html文件，但文件是空的、我们这里不需要结构 所以直接写
    new HtmlWebpackPlugin()
  ],
  // 为了看到源代码 我们调为开发模式
  mode:'development'
}