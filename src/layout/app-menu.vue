<template>
<a-menu mode="inline" 
        :style="{ height: '100%', borderRight: 0 }"
         @click="changeRouteAction"
         :defaultSelectedKeys="[selectKey]"
         :defaultOpenKeys="openKeys"
>
  <template v-for="item in menuData">
    <!-- 二级目录 -->
    <a-sub-menu class="item-bg" v-if="item.children&&item.children.length>0"  :key="item.name">
      <span slot="title">
        <img :src="item.meta.img" alt="">
        <span>{{item.meta.title}}</span>
      </span>
      <template v-for="subItem in item.children">
      <a-menu-item v-if="subItem.meta.show!==false" :key="subItem.name" >
        <span>{{subItem.meta.title}}</span>
      </a-menu-item>
      </template>
    </a-sub-menu>
    <!-- 一级目录 -->
    <a-menu-item class="item-bg" v-else :key="item.name">
      <img :src="item.meta.img" alt="">
      <span>{{item.meta.title}}</span>
    </a-menu-item>
  </template>
  </a-menu>
</template>

<script>
import {Menu,Icon} from 'ant-design-vue'
import mainRoute from '../router/mainRoute'
export default {
    components:{
        [Menu.name]:Menu,
        [Menu.Item.name]:Menu.Item,
        [Menu.SubMenu.name]:Menu.SubMenu,
        [Icon.name]:Icon,
        mainRoute
    },
    data(){
      return{
        menuData:mainRoute.children,
        selectKey:this.$route.name
      }
    },
    computed:{
      openKeys(){
        const index=this.$route.matched.findIndex(item=>item.name===this.$route.name);
        if(index===1){
          //一级目录
          return [];
        }else{
          //二级目录
          return [this.$route.matched[1].name];
        }
      }
    },
    methods:{
      changeRouteAction({key}){
        this.$router.push({name:key});
      }
    },
    created(){
      // console.log(this.$route);
      // console.log(this.openKeys);
    }
}
</script>

<style lang="scss" scoped>
.ant-menu-item{
  border-bottom: 1px solid #ddd;
}
img{
  width: 20px;
  height: 20px;
  margin-right: 4px;
  margin-top: -3px;
}
.item-bg{
  background-color: #F2F2F2;
}
</style>
<style>
.ant-menu-submenu-title{
  border-bottom: 1px solid #ddd;
}
</style>