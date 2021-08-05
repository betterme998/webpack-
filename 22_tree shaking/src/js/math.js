// export function add(x, y) { //方法一
//   return x + y;
//   console.log('return1 后代码不显示这行文字');
// }

// export function minus(x, y) {
//   return x - y;
//   console.log('return2 后代码不显示这行文字');
// }

// 为Number的原型添加一个扩展方法 //方法二
// 当引入这个扩展方法会对所有文件起到作用 这就是 副作用
Number.prototype.pad = function(size) {
  let res = this+'';
  while(res.length<size){
    res = '0'+res
  }
  return res
}
