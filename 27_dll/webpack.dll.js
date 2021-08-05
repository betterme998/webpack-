
/*
  使用dll技术，对某些库（第三方的库如：jquery,react,vue...）进行单独打包
  当你运行 webpack时， 默认查找webpack.config.js配置文件
  需求：需要运行webpack.dll.js文件
   所以指令要改： webpack --config webpack.dll.js  意思是：告诉webpack我们的配置文件改了 是webpack.dll.js,不要
   再用webpack.config.js啦
*/ 

// 向外暴漏出去一个对象
const {resolve} = require('path');
const webpack = require('webpack');
module.exports = {
  // 运行之后 下面两个配置（entry,output） 会将jquery打包进来，并且输出出去，jquery暴漏出去的内容是jquery+hash值
  entry:{
    // 最终打包生产的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery，因为是数组，将来和jquery类似的库都可以放里面，都可以进行打包
    jquery:['jquery']
  },
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'dll'),
    library:'[name]_[hash]' //打包的库里面向外暴漏出去的内容叫什么名字,加上哈希值保证每次打包的值是不一样的
    // 这样它向外暴漏的名字就会加上jquery+打包生成的hash值。 所以不能仅仅通过一个简单的jquery拿到这里面的内容，还得加上hash值才行
  },
// 上面两个配置是专门打包jquery的,同时jquery向外暴漏的名字是jquery加hash值

  plugins:[
    // 下面插件的作用呢帮我们打包生成一个manifest.json文件 --> 这个文件提供一个映射关系:jquery映射关系,通过映射知道jquery不需要
    // 进行打包

    // 这样可以对jquery进行单独打包，但是我们需要建立起一个依赖关系，需要告诉webpack将来我在打包的时候不要打包jquery了
    // 这时候要借助一个插件,来生成一个文件,而这插件是webpack自带的我们只要引入webpack就可以了
    new webpack.DllPlugin({
      // 传一些参数
      name:'[name]:[hash]', //映射库的暴漏的内容名称
      // 第二个就是我们这个库最终要输出到哪里去
      path:resolve(__dirname,'dll/manifest.json') //输出文件路径
    })
  ],
  mode:'production'
  // 一旦运行这个配置，就会对库进行单独打包同时会生成一个manifest.json文件提供和单独打包的库的映射关系
  
}