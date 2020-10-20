// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

// 导入重置样式
import './assets/css/reset.css';

// 导入axios
import './common/http';

// 导入element.js
import './common/element';

// 导入element-ui
import elementUI from 'element-ui';
// 导入element-ui的样式库
import 'element-ui/lib/theme-chalk/index.css';

// 导入vuex仓库
import store from '../src/store/index';

// 将element-ui注册成vue的插件：将element-ui中提供的组件注册成全局组件
Vue.use(elementUI);

Vue.config.productionTip = false;


// 将图片服务器的baseUrl绑定到vue的原型对象上
Vue.prototype.$imgBaseUrl = 'http://localhost:3000';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
