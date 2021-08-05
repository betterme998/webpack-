// 初始化项目后 要用webpack得下载两个包 webpack webpack-cli  全局安装之后再本地安装一下

// index.js:此文件为  webpack入口起点文件
// 一。测试webpack 可不可以理解javascript和json文件
// 1.运行指令 开发环境指令：webpack ./src/index.js -o ./build/build.js --mode=development(-o 输出到哪里去)(--mode指定打包环境) 
//       翻译：webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/build.js  整体打包环境，是开发环境

// 生产环境： webpack ./src/index.js -o ./build/build.js --mode=production
// 翻译：webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/build.js  整体打包环境，是生产环境

// 测试结果 webpack 可以处理js/json
//二， 测试webpack 可不可以理解css/img   测试结果不行，生产环境比开发环境多一个压缩js代码
// 生产环境和开发环境 ES6模块化编译成浏览器能识别的模块化
// import './index.css';
import data from './data.json';

console.log(data);

function add(x,y){
    return x+y;
}
console.log(add(5,4));