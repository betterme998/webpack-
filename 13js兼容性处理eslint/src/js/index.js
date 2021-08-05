// import '@babel/polyfill' 使用第三种方案就不能使用第二种方案
const add = (x, y) => {
  return x + y; 
}
console.log(add(2, 3));
const promise = new Promise((resolve)=>{
  setTimeout(()=>{
    console.log('定时器执行完了');
    resolve();
  },2000)
}) 

console.log(promise);