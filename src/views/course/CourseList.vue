<template>
  <div>
      <h1>课程管理</h1>
      <div class="header">
        <div class="top">
          <img src="/image/shaixuan.png" alt="">
          <span>筛选</span>
        </div>
        <div class="content">
          <p class="select">
            <label for="">校区：</label>
             <a-select :size="size" default-value="请选择校区" style="width: 165px" @change="handleChange">
                <a-select-option v-for="item in school" :key="item.name">
                    {{ item.name }}
                </a-select-option>
            </a-select>
            <label for="">年级：</label>
             <a-select :size="size" default-value="请选择年级" style="width: 165px" @change="handleChange">
                <a-select-option v-for="item in grade" :key="item.name">
                    {{ item.name }}
                </a-select-option>
            </a-select>
            <label for="">学科：</label>
            <a-select :size="size" default-value="请选择学科" style="width: 165px" @change="handleChange">
                <a-select-option v-for="item in subject" :key="item.name">
                    {{ item.name }}
                </a-select-option>
            </a-select>
            <label for="">学期：</label>
            <a-select :size="size" default-value="请选择学期" style="width: 165px" @change="handleChange">
                <a-select-option v-for="item in semester" :key="item.name">
                    {{ item.name }}
                </a-select-option>
            </a-select>
          </p>
          <a-input placeholder="输入标题或关键字" />
          <label for="" style="margin-right:20px">上传时间：</label>
           <a-date-picker
              v-model="startValue"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="开始时间"
              @openChange="handleStartOpenChange"
            /> ——
            <a-date-picker
              v-model="endValue"
              :disabled-date="disabledEndDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="结束时间"
              :open="endOpen"
              @openChange="handleEndOpenChange"
            />
            <a-button type="primary">筛选</a-button>
        </div>
      </div>
      <div class="list">
        <div class="top">
          <div class="left">
              <img src="/image/list.svg" alt="">
              <span>课程列表</span>
          </div>
          <a-button type="primary" @click="AddCourseAction">新增课程</a-button>
          <a-button type="primary" @click="EditCourseAction">编辑</a-button>
        </div>
        <div class="content">
          <a-table :columns="columns" :data-source="data" bordered :pagination="false">
            <template slot="name" slot-scope="text">
              <a>{{ text }}</a>
            </template>
          </a-table>
          <a-pagination
            :total="85"
            :show-total="total => `共 ${total} 条数据`"
            :page-size="20"
            :default-current="1"
          />
        </div>
      </div>
  </div>
</template>

<script>
import {DatePicker,Input,Button,Table,Pagination,Select  } from "ant-design-vue";
import moment from 'moment';
const columns = [
  {title: '选择'},
  {
    title: '课程编号',
    dataIndex: 'name',
  },
  {
    title: '课程名称',
    dataIndex: 'money',
  },
  {
    title: '校区',
    dataIndex: 'address',
  },
  {title: '年级'},{title: '学期'},{title: '价格'},{title: '名额'},{title: '报名人数'},{title: '学科'},{title: '状态'},{title: '操作'}
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
export default {
  components:{
    [DatePicker.name]:DatePicker,
    [Input.name]:Input,
    [Button.name]:Button ,
    [Table .name]:Table ,
    [Pagination.name]:Pagination,
    [Select.name]:Select,
    [Select.Option.name]:Select.Option,
  },
  data(){
    return{
      school:[
        {name:'海淀校区'},{name:'朝阳校区'},{name:'西城校区'},{name:'东城校区'},{name:'石景山校区'},{name:'丰台校区'},{name:'房山校区'},{name:'通州校区'}
      ],
      grade:[
        {name:'小学一年级'},{name:'小学二年级'},{name:'小学三年级'},{name:'小学四年级'},{name:'小学五年级'},{name:'小学六年级'},{name:'初中一年级'},{name:'初中二年级'},{name:'初中三年级'}
      ],
      subject:[
        {name:'不限'},{name:'数学'},{name:'语文'},{name:'英语'},{name:'综合'},{name:'编程'},{name:'科学'}
      ],
      semester:[
        {name:'不限'},{name:'春季班'},{name:'夏季班'},{name:'冬季班'},{name:'暑假班'},{name:'寒假班'}
      ],
      startValue: null,
      endValue: null,
      endOpen: false,
      data,
      columns,
      size: 'default',
    }
  },
  watch: {
    startValue(val) {
      console.log('startValue', val);
    },
    endValue(val) {
      console.log('endValue', val);
    },
  },
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    AddCourseAction(){
      this.$router.push('add-course')
    },
     handleChange(value) {
      console.log(`Selected: ${value}`);
    },
    popupScroll() {
      console.log('popupScroll');
    },
    EditCourseAction(){
      this.$router.push('edit-course')
    }
  },
}
</script>

<style lang="scss" scoped>
h1{
  font-size: 28px;
  font-weight: 700;
}
.header,.list{
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  .top{
    height: 45px;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #f2f2f2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img{
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    span{
      font-size: 16px;
      color: #333;
    }
  }
  .content{
    padding: 10px;
    font-size: 14px;
    color: #333;
    .select{
      padding-top: 10px;
    }
    input{
      width: 183px;
      height: 25px;
      padding: 1px;
      color: rgb(153, 153, 153);
      font-size:13px;
      margin-right: 50px;
    }
  }
}
.list{
  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}

</style>
<style lang="scss">

.ant-btn-primary{
  margin-left: 60px;
}
.ant-pagination{
  text-align: right;
  margin-top: 20px;
}
.ant-select {
margin-right: 10px;
}
</style>
