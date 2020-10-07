<template>
  <div id="auth">
    <img src="/image/bus.png" alt="">
    <div class="user_info">
      <h1>后台管理系统</h1>
      <router-view/>
      <nav class="nav">
        <!-- <router-link to="/auth/login" class="item">登录</router-link> -->
        <!-- <router-link to="/auth/register" class="item">注册</router-link> -->
      </nav>
      
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  created(){
    
  }
}
</script>

<style lang="scss" scoped>
#auth{
  background-color: #fff;
  width: 550px;
  height: 350px;
  border: 1px solid #999;
  border-radius: 5px;
  position: absolute;
  top: 50%;left: 50%;
  margin-top: -175px;
  margin-left: -275px;
  img{
    width: 220px;
    height: 220px;
    float: left;
    margin-top: 50px;
  }
  .user_info{
    float: right;
    margin-top: 50px;
    margin-right: 30px;
    h1{
      text-align: center;
    }
  }
}
.nav{
  display: flex;
  justify-content: space-around;
  align-items: center;
  .item{
    text-decoration: none;
    color: #333;
    font-size:20px;
    font-weight: 700;
    &.router-link-active{
      color: green;
    }
  }
}
</style>