import '../css/index.css';
import index2 from './index2';

function add(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(add(2, 3, 5,5));
index2();
