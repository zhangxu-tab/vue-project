<template>
  <div class="layout">
    <fullscreen ref="fullscreen">
      <el-container>
        <el-aside :width="asideWidth">
          <h3 class="logo-title">小U商城后台</h3>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#262a32"
            text-color="#f1f1f1"
            active-text-color="#FFF"
            router
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
          >
            <el-menu-item index="/">
              <i class="el-icon-setting"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/admin">管理员管理</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商城管理</span>
              </template>
              <el-menu-item index="/category">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>echarts演示</span>
              </template>
              <el-menu-item index="/bar">柱型图</el-menu-item>
              <el-menu-item index="/pie">饼状图</el-menu-item>
              <el-menu-item index="/line">折线图</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <div class="left">
              <el-button
                type="primary"
                icon="el-icon-s-fold"
                size="mini"
                @click="isCollapse = !isCollapse"
              ></el-button>
              <!-- 面包屑导航 -->
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
              </el-breadcrumb>
              <!-- 返回按钮 -->
              <el-button @click="$router.go(-1)" icon="el-icon-back" circle size="small"></el-button>
            </div>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="fullScreen">
                  <i class="el-icon-full-screen"></i>
                  全屏操作
                </el-dropdown-item>
                <el-dropdown-item command="userInfro">
                  <i class="el-icon-user"></i>
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item command="loginOut">
                  <i class="el-icon-switch-button"></i>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>
          <el-main>
            <!-- 二级路由出口 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </fullscreen>
  </div>
</template>

<script>
import Vue from "vue";
// 导入vue-fullscreen全屏预览组件
import fullscreen from "vue-fullscreen";
// 注册插件
Vue.use(fullscreen);

export default {
  name: "layout",
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    // 侧边栏宽度
    asideWidth() {
      return this.isCollapse ? '64px' : '226px';
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      // console.log(command)
      this[command]();
    },
    // 个人信息
    userInfro() {

    },
    // 全屏操作
    fullScreen() {
      this.$refs.fullscreen.toggle();
    },
    // 安全退出
    loginOut() {
      // 删除本地存储中的用户登录信息
      sessionStorage.removeItem("userinfro");
      // 重定向到/login
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.left {
  display: flex;
  align-items: center;
}
.el-breadcrumb {
  margin: 0 10px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
}
.logo-title {
  line-height: 60px;
  text-align: center;
  background: #444444;
  color: #ffffff;
  font-weight: normal;
  letter-spacing: 4px;
  white-space: nowrap;
  overflow: hidden;
}
/* 导航菜单 */
.el-menu-vertical-demo {
  height: calc(100vh - 60px);
  border-right: 0;
}
/* 设置导航的高粱样式 */
.el-menu-item.is-active {
  background: #409eff !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
