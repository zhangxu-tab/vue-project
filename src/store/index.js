// 导入vuex
import Vue from 'vue';
import Vuex from 'vuex';

// vuex注册成vue的插件
Vue.use(Vuex);

// 创建仓储对象
const store = new Vuex.Store({
    // 状态数据
    state: {
        // 控制侧边栏的折叠状态，false为非折叠
        isCollapse: false,
        // 菜单列表
        menus:[],
        // 当前登录用户的信息
        username:''
    },
    // 更新状态数据的方法
    mutations: {
        // 更新isCollapse
        // 第一个参数state是系统自动注入的，代表的就是当前仓储中维护的数据对象
        updateIsCollapse(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 初始化menus
        menusInit(state) {
            // 从本地存储中读取数据
            const userinfro = JSON.parse(sessionStorage.getItem('userinfro') || '{}');
            state.menus = userinfro.menus;
        }
    },
    // 类似于组件中的计算属性
    getters: {
        // 此处必须有返回值
        asideWidth(state) {
            return state.isCollapse ? '64px' : '226px';
        }
    },
    // 异步函数：请求数据接口
    actions: {

    },
    // 功能模块
    modules: {

    }
});

// 导出store
export default store;
