import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import auth from './authRoute'
import main from './mainRoute'

Vue.use(VueRouter)

const routes = [
  auth,
  main,
 
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
