import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import mlComponents from '@ml/ml-components';
import '@/styles/index.scss';

Vue.config.productionTip = false;

import elementUi from 'element-ui';

Vue.use(elementUi, { size: 'small', zIndex: 3000 }).use(mlComponents);

// 初始化vue 以及qiankun微服务相关
let instance = null;
function render(props: any = {}) {
  const { container } = props;
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  // router = null
}
