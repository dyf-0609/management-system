import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path:'/auth',
    name:'auth',
    redirect:'/auth/login',
    component:()=>import('../views/auth/Auth'),
    children:[
      {
        path:'login',
        name:'login',
        component:()=>import('../views/auth/Login')
      },
      {
        path:'register',
        name:'register',
        component:()=>import('../views/auth/Register')
      }
    ]
  },
  {
    path:'/',
    component:()=>import ('../layout/Index'),
    children:[
      //首页
      {
        path:'',
        name:'home',
        component:()=>import('../views/home/Home')
      },
      //课程管理
      {
        path:'course',
        name:'course',
        component:{
          render:()=><router view/>
        },
        redirect:'/course/course-list',
        children:[
          //课程列表
          {
            path:'course-list',
            name:'course-list',
            component:()=>import('../views/course/CourseList')
          },
          //课程消耗
          {
            path:'course-consumption',
            name:'course-consumption',
            component:()=>import('../views/course/CourseConsumption')
          },
        ]
      },
      //班级管理
      {
        path:'class',
        name:'class',
        component:()=>import('../views/home/Home')
      },
      //订单管理
      {
        path:'order',
        name:'order',
        component:()=>import('../views/home/Home')
      },
      //学员管理
      {
        path:'student',
        name:'student',
        component:()=>import('../views/home/Home')
      },
      //教师管理
      {
        path:'teacher',
        name:'teacher',
        component:()=>import('../views/home/Home')
      },
      //文章管理
      {
        path:'article',
        name:'article',
        component:()=>import('../views/home/Home')
      },
      //促销活动
      {
        path:'sales',
        name:'sales',
        component:()=>Himport('../views/home/Home')
      },
      //统计分析
      {
        path:'statistics',
        name:'statistics',
        component:()=>import('../views/home/Home')
      },
      //系统设置
      {
        path:'setting',
        name:'setting',
        component:()=>import('../views/home/Home')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  if(to.name==='login'||to.name==='register'){
    //登录注册页面
    next();
  }else{
    //进入项目
    //判断是否有权限
    // console.log(store.state.user.isLogin);
    if(store.state.user.isLogin){
      next();
    }else{
      next('/auth');
    }
  }
})

export default router
