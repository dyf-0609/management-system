<template>
  <a-layout id="components-layout-demo-top-side-2">
    <!-- 头部 -->
    <app-header/>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <!-- 侧边栏 -->
        <app-menu/>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, flex:'none','min-height':'800px'}"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

</template>
<script>
import { Layout } from "ant-design-vue";
import AppMenu from "./app-menu";
import AppHeader from "./app-header";
export default {
    components: {
        [Layout.name]: Layout,
        [Layout.Sider.name]: Layout.Sider,
        [Layout.Content.name]: Layout.Content,
        AppMenu,
        AppHeader,
    },
    data() {
        return {
        collapsed: false,
        };
    },
};
</script>

<style lang="scss">
#components-layout-demo-top-side-2 .logo {
  height: 80px;
  background-color:rgba(16, 142, 233, 1) ;
  float: left;
  line-height: 80px;
  h1{
      color: #fff;
      font-size: 28px;
      font-weight: 700;
  }
}
#components-layout-demo-top-side-2{
    height: 100%;
    min-width: 1350px;
}


</style>


