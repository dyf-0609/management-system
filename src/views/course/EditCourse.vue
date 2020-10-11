<template>
  <div class="edit-course">
    <div class="header">
      <h1>编辑课程</h1>
      <a-button type="primary" @click="goBackAction">返回</a-button>
    </div>
    <div class="content">
        <p></p>
    </div>
  </div>
</template>

<script>
import {Button} from 'ant-design-vue'
export default {
    components:{
        [Button.name]:Button
    },
    methods:{
        goBackAction() {
            this.$router.back();
        },
    }
};
</script>

<style lang="scss" scoped>
.edit-course{
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
        font-size: 28px;
        font-weight: 700;
        }
    }
    .content{
        width: 100%;
        padding: 20px;
        min-height: 500px;
        border: 1px solid #ddd;
    }
} 
</style>