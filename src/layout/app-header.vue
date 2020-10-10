<template>
<a-layout-header class="header">
      <div class="logo" >
          <h1>后台管理系统</h1>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
            <img src="/image/admin.png" alt="">
            <span>admin</span>
        </a-menu-item>
        <a-menu-item key="2">
            <img src="/image/xiaoxi.png" alt="">
            <span>消息</span>
        </a-menu-item>
        <a-menu-item key="3" @click="logoutAction">
            <img src="/image/tuichu.png" alt="">
            <span>退出</span>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
</template>

<script>
import axios from 'axios'
import {Layout,Menu} from 'ant-design-vue'
export default {
    components:{
        [Layout.Header.name]:Layout.Header,
        [Menu.name]:Menu,
        [Menu.Item.name]:Menu.Item
    },
    methods:{
        logoutAction(){
            axios.get('/api/user/logout')
            .then(data=>{
                this.$store.dispatch('user/changeLoginAction', false);
            })
        }
    }
     
}
</script>

<style lang="scss" scoped>
.header{
    width: 100%;
    height: 80px;
    background-color:rgba(16, 142, 233, 1) ;
    min-width: 900px;
}
.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
    background-color:rgba(16, 142, 233, 1) ;
    float: right;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item, .ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu{
    margin-left: 30px;
    margin-right: 20px;
    line-height: 80px;
    img{
        margin-right: 10px;
    }
}

</style>