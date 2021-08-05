
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
module.exports = {
  entry:'./src/index.js',
  output:{
    // 文件名称 (指定名称+目录)
    filename:'js/[name].js',
    // 输出文件目录 (将来所有资源输出的公共目录)
    path:resolve(__dirname,'build'),
    // 所有资源引入公共路径前缀 --> 比如：有一个图片路径'imgs/a.jpg' (当前路径下直接找imgs) -->经过公共路径的处理——>'/imgs/a.jpg'（这样的路径/会以当前的服务器地址去补充 然后去服务器根目录下找imgs目录，在找a.jpg）
    // 当我们代码上线时更倾向使用 这种'/imgs/a.jpg'路径 所以会通过 publicPath来配置一个公共路径
    // 如script标签引入资源。资源前面要不要加 / (斜杠)，设置了就加，没设置就不加
    // 如样式文件通过link标签引入 要不要加路径， img要不要加路径
    // 一般用于生产环境
    publicPath:'/',

      /*
      非入口chunk的名称 （entry指定的文件就叫入口chunk）
      额外的chunk就由 chunkFilename命名
      怎样才算额外的chunk呢?
       有两种方式
       1通过import语法会将一个文件单独分割成一个chunk,这个名称就会采用'[name]_chunk/js'命名
       2通过optimization 将node_modules里面的东西分割成单独的chunk,node_modules的chunk也会遵守'[name]_chunk/js'命名
      */ 
    chunkFilename:'js/[name]_chunk.js',

    /*
      我们之前输出的文件如main.js 整个外面包裹了一个函数，所以里面的内容都在函数作用域中，外面想要引用的话是不能的，
      哪我们想把里面的内容暴漏出去给外面使用时用library:'[name]' 把变量暴漏出去
      library一般是作为暴漏一个库去使用通常是结合dll将某些库进行单独打包，然后我们引入使用，这时才使用library
      如果正常打包 library一般不用的
    */ 
    library:'[name]',//整个库向外暴漏的变量名
    // 变量暴漏出去还可以通过libraryTarget定义
    libraryTarget: 'window'//变量名添加到那个上browser
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}