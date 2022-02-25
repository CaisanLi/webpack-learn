import throttle from 'lodash/throttle';
// 使用 css-loader 将css文件转换成模块
import './assets/css/index.css';

let count = 0;
const $box = document.querySelector('.box');
const $count = document.querySelector('#count');

const scrollFn = throttle(() => {
  $count.innerHTML = (++count);
}, 1000)

$box.addEventListener('scroll', scrollFn);

