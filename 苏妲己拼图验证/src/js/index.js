import '../css/iconfont.css';
import '../css/a.css';

let shouldMove = false;// 用来判断是否在点击的状态下
const captcha = document.querySelector('#captcha');
const handle = document.querySelector('#handle');
const button = document.querySelector('#handle span');
const jia = document.querySelectorAll('.s');
const iconfont = document.querySelector('.iconfont');
// 鼠标按下

button.addEventListener('mousedown', (e) => {
  shouldMove = true;
  // e.preventDefault();
  // console.log(jia)
});

button.addEventListener('touchstart', (e) => {
  e.preventDefault();
  shouldMove = true;
});

// 换一套
let dd = 0;
let ff = 0;
function iconbtn() {
  iconfont.classList.toggle('icon-return');
  iconfont.classList.toggle('icon-resonserate');

  if (dd == 0) { dd = 3; } else { dd = 0; }
  jia.forEach((btn, index) => {
    if (dd == 3) {
      ff = index + dd;
      jia[index].classList.add(`a${ff}`);
      jia[index].classList.remove(`a${index}`);
      captcha.classList.add(`huan${dd}`);
      captcha.classList.remove(`huan${0}`);
      captcha.classList.remove('passed');
      captcha.style.setProperty('--moved', '0px');
    } else {
      ff = index + 3;
      jia[index].classList.add(`a${index}`);
      jia[index].classList.remove(`a${ff}`);
      captcha.classList.remove(`huan${3}`);
      captcha.classList.add(`huan${0}`);
      captcha.classList.remove(`huan${ff}`);
      captcha.classList.remove('passed');
      captcha.style.setProperty('--moved', '0px');
    }
    // }
  });
}
iconfont.addEventListener('mousedown', () => {
  iconbtn();
});

iconfont.addEventListener('touchstart', (e) => {
  e.preventDefault();
  iconbtn();
});

// 换图
let ass = 0;
function mousedownTouchstart(index) {
  captcha.classList.add('huan' + `${index + dd}`);
  // console.log(dd);

  for (let i = 0; i < jia.length; i++) {
    if (i == index) {
      if (i == 0) {
        ass = i + 1 + dd;

        captcha.classList.remove(`huan${ass}`);
        ass = i + 2 + dd;

        captcha.classList.remove(`huan${ass}`);
        captcha.classList.remove('passed');
        captcha.style.setProperty('--moved', '0px');
        ass = 0;
      } else if (i == 1) {
        ass = i - 1 + dd;

        captcha.classList.remove(`huan${ass}`);
        ass = i + 1 + dd;

        captcha.classList.remove(`huan${ass}`);
        captcha.classList.remove('passed');
        captcha.style.setProperty('--moved', '0px');
        ass = 0;
      } else {
        ass = i - 1 + dd;

        captcha.classList.remove(`huan${ass}`);
        ass = i - 2 + dd;

        captcha.classList.remove(`huan${ass}`);
        captcha.classList.remove('passed');
        captcha.style.setProperty('--moved', '0px');
        ass = 0;
      }
      // captcha.classList.remove('huan'+ass);
      // console.log(ass);
    }
  }
}
jia.forEach((btn, index) => {
  btn.addEventListener('mousedown', (e) => {
    mousedownTouchstart(index);
  });

  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    mousedownTouchstart(index);
  });
});

// 鼠标移动

function mousemoveTouchmove(e) {
  if (shouldMove) {
    e.stopPropagation();
    let touch;

    if (e.touches) {
      touch = e.changedTouches[0];
    } else {
      touch = e;
    }
    // 定义常量 获取拉到杆与动画左边的位移
    const offsetLeft = handle.getBoundingClientRect().left;
    // 定义常量 获取拉到杆的宽
    const buttonWidth = button.getBoundingClientRect().width;
    // 修改captcha --moved的值
    captcha.style.setProperty('--moved', `${touch.clientX / 16 - offsetLeft / 16 - buttonWidth / 32}rem`);
  }
}

window.addEventListener('touchmove', (e) => {
  e.preventDefault();

  mousemoveTouchmove(e);
});

window.addEventListener('mousemove', (e) => {
  mousemoveTouchmove(e);
});

// 鼠标放开
function mouseupTouchend(e) {
  if (shouldMove) {
    let touch;

    if (e.touches) {
      touch = e.changedTouches[0];
    } else {
      touch = e;
    }
    const finalOffset = touch.clientX - handle.getBoundingClientRect().left;

    if (finalOffset >= captcha.clientWidth && finalOffset <= captcha.clientWidth + button.clientWidth) {
      captcha.classList.add('passed');
    } else {
      captcha.style.setProperty('--moved', '0px');
    }
    shouldMove = false;
  }
}
window.addEventListener('touchend', (e) => {
  mouseupTouchend(e);
});
window.addEventListener('mouseup', (e) => {
  mouseupTouchend(e);
});
