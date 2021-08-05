import print from './print';
import '../css/iconfont.css';
import '../css/index.css';
import '../css/index.less';

console.log("加载加载");
print();


// if(module.hot){
//   // 一旦module.hot为true (一旦module上有hot属性) ，说明开启了HMR功能 -->让以下HMR功能代码生效
  
//   module.hot.accept('./print.js',function (){
//   // 方法会监听print.js文件的变化，一旦发生变化，其他模块默认不会重新打包构建。
//   // 会执行后面的回调函数
//   print();
//   })
// }