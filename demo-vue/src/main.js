
import { createApp } from 'vue';
import App from '@views/index';
import '@assets/css/global.less';

if (PRODUCTION) {
  console.log('当前是生产环境')
} else {
  console.log('当前不是生产环境')
}

createApp(App).mount('#app')