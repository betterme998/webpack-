// import { add } from './math';


/*
第三种：方法通过js代码，让某个文件被单独打包成一个chunk
  通过es10的import写法 文件路径就是想单独打包文件的路径
  一旦引入，返回值只有个对象有个.then方法和.catch()方法
  .then代表加载成功
  .catch代表加载失败
*/ 
// import动态导入语法，能将某个文件单独打包
// 当需要指定打包后的文件名时 在路径前加上注释 /* webpackChunkName: 'test' */ test是文件名
import(/* webpackChunkName: 'test' */'./math')
// 文件加载成功
  .then(({add}) => {
    console.log(add(2, 8));
  })
  // 文件加载失败
  .catch(() => {
    console.log('文件加载失败')
  })
// 这样就能将文件单独打包