console.log('index.js文件被加载了');
// import {add} from './math';

document.getElementById('btn').onclick = function (){
  // console.log(add(1, 3));
  // 懒加载  当文件需要使用时在加载（但是当文件较大，加载速度慢 会给用户带来不好的体验）
  // 我们是将import语法放到一个异步的回调函数中，这样一上来onclick函数不会立马调用，不会调用那么js代码（math.js文件）不会立马加载
  // 当点击了按钮 才会触发回调函数，触发回调函数才会真正的加载js文件
  // 懒加载前提是先进行代码分割
  // webpackChunkName: 'test' 修改打包后文件名

  // 预加载 会在使用之前，提前加载js文件
  // 正常加载可以认为是并行加载（同一时间加载多个文件，写在前面的文件会被先加载 但这个文件可能没有被使用，这样会浪费大量时间）
  // 预加载 prefetch ：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源，不会杜塞其他资源的加载（但兼容性差 一般在pc端使用， 移动端和ie浏览器会有相当大的兼容性问题） (加上下面第二个注释 就是预加载)
  // 预加载的使用要慎之又慎
  // webpackPrefetch: true   设置预加载
  import(/*webpackChunkName: 'test', webpackPrefetch: true*/'./math')
  .then(({add})=> {
    console.log(add(5, 3));
  })
}