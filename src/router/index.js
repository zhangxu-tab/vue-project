import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/pages/Login';
import Layout from '@/pages/Layout';

// 路由懒加载
// const Login = () => import('@/pages/Login');

// 导入二级路由
// 菜单管理
import Menu from '@/pages/menu/Index';
import MenuAdd from '@/pages/menu/Add';
import MenuEdit from '@/pages/menu/Edit';

// 角色管理
import Role from '@/pages/role/Index';
import RoleAdd from '@/pages/role/Add';
import RoleEdit from '@/pages/role/Edit';

// 管理员管理
import Admin from '@/pages/admin/Index';
import AdminAdd from '@/pages/admin/Add';
import AdminEdit from '@/pages/admin/Edit';

// 商品分类
import Category from '@/pages/category/Index';
import CategoryAdd from '@/pages/category/Add';
import CategoryEdit from '@/pages/category/Edit';

// 规格管理
import Specs from '@/pages/specs/Index';
import SpecsAdd from '@/pages/specs/Add';
import SpecsEdit from '@/pages/specs/Edit';

// 商品管理
import Goods from '@/pages/goods/Index';
import GoodsAdd from '@/pages/goods/Add';
import GoodsEdit from '@/pages/goods/Edit';

// 会员管理
import Member from '@/pages/Member/Index';

// 轮播图管理
import Banner from '@/pages/banner/Index';
import BannerAdd from '@/pages/banner/Add';
import BannerEdit from '@/pages/banner/Edit';

// 秒杀活动
import Seckill from '@/pages/seckill/Index';
import SeckillAdd from '@/pages/seckill/Add';
import SeckillEdit from '@/pages/seckill/Edit';

import RichText from '@/pages/goods/RichText';
// echarts图表
import Bar from '@/pages/echarts/Bar';
import Pie from '@/pages/echarts/Pie';
import Line from '@/pages/echarts/Line';


import Home from '@/pages/Home';


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      // 路由重定向
      redirect: '/home',
      // 二级路由
      children: [
        {
          path: '/home',
          component:Home,
          meta: {
            title:'销售业绩总计'
          }
        },
        {
          path: '/menu',
          component:Menu,
          meta: {
            title:'菜单列表'
          }
        },
        {
          path: '/menu/add',
          component:MenuAdd,
          meta: {
            title:'菜单添加'
          }
        },
        {
          path: '/menu/:id',
          component:MenuEdit,
          meta: {
            title:'菜单编辑'
          }
        },
        {
          path: '/role',
          component:Role,
          meta: {
            title:'角色列表'
          }
        },
        {
          path: '/role/add',
          component:RoleAdd,
          meta: {
            title:'角色添加'
          }
        },
        {
          path: '/role/:id',
          component:RoleEdit,
          meta: {
            title:'角色编辑'
          }
        },
        {
          path: '/admin',
          component:Admin,
          meta: {
            title:'管理员列表'
          }
        },
        {
          path: '/admin/add',
          component:AdminAdd,
          meta: {
            title:'管理员添加'
          }
        },
        {
          path: '/admin/:id',
          component:AdminEdit,
          meta: {
            title:'管理员编辑'
          }
        },
        {
          path: '/category',
          component:Category,
          meta: {
            title:'分类列表'
          }
        },
        {
          path: '/category/add',
          component:CategoryAdd,
          meta: {
            title:'分类添加'
          }
        },
        {
          path: '/category/:id',
          component:CategoryEdit,
          meta: {
            title:'分类编辑'
          }
        },
        {
          path: '/specs',
          component:Specs,
          meta: {
            title:'规格列表'
          }
        },
        {
          path: '/specs/add',
          component:SpecsAdd,
          meta: {
            title:'规格添加'
          }
        },
        {
          path: '/specs/:id',
          component:SpecsEdit,
          meta: {
            title:'规格编辑'
          }
        },
        {
          path: '/goods',
          component:Goods,
          meta: {
            title:'商品列表'
          }
        },
        {
          path: '/goods/add',
          component:GoodsAdd,
          meta: {
            title:'商品添加'
          }
        },
        {
          path: '/goods/:id',
          component:GoodsEdit,
          meta: {
            title:'商品编辑'
          }
        },
        {
          path: '/member',
          component:Member,
          meta: {
            title:'会员列表'
          }
        },
        {
          path: '/banner',
          component:Banner,
          meta: {
            title:'轮播图列表'
          }
        },
        {
          path: '/banner/add',
          component:BannerAdd,
          meta: {
            title:'轮播图添加'
          }
        },
        {
          path: '/banner/:id',
          component:BannerEdit,
          meta: {
            title:'轮播图编辑'
          }
        },
        {
          path: '/seckill',
          component:Seckill,
          meta: {
            title:'秒杀列表'
          }
        },
        {
          path: '/seckill/add',
          component:SeckillAdd,
          meta: {
            title:'秒杀添加'
          }
        },
        {
          path: '/seckill/:id',
          component:SeckillEdit,
          meta: {
            title:'秒杀编辑'
          }
        },
        {
          path: '/richtext',
          component:RichText
        },
        {
          path: '/bar',
          component: Bar,
          meta: {
            title:'柱型图'
          }
        },
        {
          path: '/pie',
          component: Pie,
          meta: {
            title:'饼状图'
          }
        },
        {
          path: '/line',
          component: Line,
          meta: {
            title:'折线图'
          }
        }
      ]
    }, 
    // 404路由
    {
      path: '**',
      redirect: '/home'
    }
  ]
})

// 添加一个全局的路由导航守卫：做登录拦截
router.beforeEach((to,from,next) => {
  // console.log(to);
  if(to.path != '/login') {
    // 判断登录状态
    const userInfro = JSON.parse(sessionStorage.getItem('userinfro') || '{}')
    // 未登录
    if(!userInfro.token) {
      return next('/login')
    }
    // 已登录
    return next()
  }
  next();
})

export default router;
