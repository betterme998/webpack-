/*
  resolve是用来解析模块的规则
*/ 

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/[name].js',
    path:resolve(__dirname,'build')
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
  mode:'development',

  // 因为webpack是一个对象，对象属性是没有顺序的所以也可以写在其它位置
  // 解析模块的规则
  resolve:{
    // alias为了让写代码更加方便，可以简写路径
    // 配置解析模块路径别名
      // 路径别名能怎么样呢， 要引用的文件（如a.css）可能会切到非常多层，尤其在写项目的时候我们会有不同的目录层级代表不同的组件
      // 组件下面可能又嵌套一些其他的内容，目录层级会非常深，从而要回过头来找(css)目录就会非常费劲，要回退好几层，1容易出错 2写起来麻烦
      // 所以配置路径别名就可以解决上面的问题
    alias:{
      // 配置了一个变量$css,它的值呢就代表css目录的绝对路径
      // 优点：简写路径， 缺点：写路径时没有提示
      $css: resolve(__dirname,'src/css')
    },

    // extensions:是为了让我们写代码的时候可以简写文件后缀名
    // 配置省略文件路径的后缀名
    // 尽量文件不要写一样的名字
    extensions:['.js','.json'],
    // 告诉webpack 解析模块是去哪个目录。 找node_modules会一层一层的找，所以加上绝对路径就会快一些,会直接去最外层找
    // modules:是为了让我们解析模块的时候可以准确找到node_modules的位置，而不是一层一层找
    modeles:[resolve(__dirname,'../../node_modules'), 'node_modules']
  }
}