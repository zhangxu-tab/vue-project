// 导入vue
import Vue from 'vue';

// 导入axios
import axios from 'axios';

import { Message } from 'element-ui';

// 配置一个请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config);
    // 从本地存储中获取token
    const userInfro = JSON.parse(sessionStorage.getItem('userinfro') || '{}')
    config.headers.authorization = userInfro.token;
    return config;
});
// 响应拦截器
axios.interceptors.response.use(function (config) {
    // 判断状态码，如果code!=200,说明登录已超时，需要重新登录
    if(config.data.code == 403) {
        // 错误提示
        Message({
            type:"error",
            message:config.data.msg
        })
        // 重定向到login
        // 错误的做法: this.$router.push();
        location.href = '#/login';
    }
    // 将服务器返回的数据解构出来直接返回
    return config.data;
});


// 每个组件中都需要使用axios,将axios挂载到vue的原型对象上
// 实例对象中可以访问原型对象中的属性
Vue.prototype.$http = axios;

// 在线数据接口，并且解决了跨域的问题

// 导出axios
export default axios;