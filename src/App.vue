<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState({
      isLogin:state=>state.user.isLogin
    })
  },
  watch:{
    isLogin:{
      handler(newVal){
        if(!newVal){
          //登录状态过期了，需要重新登录
          this.$router.replace('/auth');
        }
      },
      immidiate:true
    }
  },
  created(){
    //检查登录了吗，是否过期了
    if(this.isLogin){
      this.$store.dispatch('user/checkLogin'); 
    }
   
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
#app{
  background-color: rgba(16, 142, 233, 1);
  position: absolute;
  top: 0;left: 0;right: 0;bottom: 0;
}
</style>