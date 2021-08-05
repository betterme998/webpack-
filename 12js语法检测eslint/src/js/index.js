function add(x, y) {
  return x + y;
}
console.log(add(1, 2));

// 当这样定义时检测会报错 但这又是一个合理的代码所以要让它跳过检测 如下：加上注释
// 下一行eslint所有的规则都失效（下一行不进行exlint检查）
// eslint-disable-next-line
window.add = add;
