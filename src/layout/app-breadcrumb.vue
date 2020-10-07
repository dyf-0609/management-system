<template>
<a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue'
export default {
    components:{
        [Breadcrumb.name]:Breadcrumb,
        [Breadcrumb.Item.name]:Breadcrumb.Item,
    }
}
</script>

<style>

</style>