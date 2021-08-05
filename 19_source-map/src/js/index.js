import print from './print';
import '../css/index.css';
import '../css/iconfont.css';
import '../css/index.less';

console.log('inde被加载了');
print();

if(module.hot){
  module.hot.accept('./print.js',function(){
    print();
  })
}