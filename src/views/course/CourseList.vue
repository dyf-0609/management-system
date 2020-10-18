<template>
  <div>
    <h1>课程管理</h1>
    <div class="header">
      <div class="top">
        <img src="/image/shaixuan.png" alt="" />
        <span>筛选</span>
      </div>
      <div class="content">
        <p class="select">
          <label for="">校区：</label>
          <a-select
            :size="size"
            default-value="请选择校区"
            style="width: 165px"
            @change="schoolChange"
          >
            <a-select-option v-for="item in school" :key="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <label for="">年级：</label>
          <a-select
            :size="size"
            default-value="请选择年级"
            style="width: 165px"
            @change="gradeChange"
          >
            <a-select-option v-for="item in grade" :key="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <label for="">学科：</label>
          <a-select
            :size="size"
            default-value="请选择学科"
            style="width: 165px"
            @change="subjectChange"
          >
            <a-select-option v-for="item in subject" :key="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <label for="">学期：</label>
          <a-select
            :size="size"
            default-value="请选择学期"
            style="width: 165px"
            @change="semesterChange"
          >
            <a-select-option v-for="item in semester" :key="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a-button type="primary" @click="selectAction">筛选</a-button>
        </p>
        
      </div>
    </div>
    <div class="list">
      <div class="top">
        <div class="left">
          <img src="/image/list.svg" alt="" />
          <span>课程列表</span>
        </div>
        <a-button type="primary" @click="AddCourseAction">新增课程</a-button>
      </div>
      <div class="content">
        <!-- 表格 -->
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="listData"  :rowKey="(record,index)=>{return index}">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"> Name</span>
          <span slot="action" slot-scope="text,record">
            <a>编辑</a>
            <a-divider type="vertical" />
            <a @click="removeAction(record._id)">删除</a>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../api/http";
import { INFO_API,REMOVE_API,SELECT_API} from "../../api/url";
import {
  DatePicker,
  Input,
  Button,
  Table,
  Select,
  Divider
} from "ant-design-vue";
import moment from "moment";
const columns = [
  { title: "课程编号",dataIndex: "course_id",key: "课程编号"},
  { title: "课程名称",dataIndex: "course_name",key: "课程名称"},
  { title: "校区",dataIndex: "school",key: "校区"},
  { title: "年级", dataIndex: "grade", key: "年级" },
  { title: "学期", dataIndex: "semester", key: "学期" },
  { title: "价格", dataIndex: "price", key: "价格" },
  { title: "名额", dataIndex: "quota", key: "名额" },
  { title: "学科", dataIndex: "subject", key: "学科" },
  { title: "状态", dataIndex: "isOpen", key: "状态" },
  { title: '操作', key: 'action',scopedSlots: { customRender: 'action' }},
];

export default {
  components: {
    [DatePicker.name]: DatePicker,
    [Input.name]: Input,
    [Button.name]: Button,
    [Table.name]: Table,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [Divider.name]:Divider,
  },
  data() {
    return {
      showData: [],
      school: [
        { name: "请选择校区" },
        { name: "海淀校区" },
        { name: "朝阳校区" },
        { name: "西城校区" },
        { name: "东城校区" },
        { name: "石景山校区" },
        { name: "丰台校区" },
        { name: "房山校区" },
        { name: "通州校区" },
      ],
      grade: [
        { name: "请选择年级" },
        { name: "小学一年级" },
        { name: "小学二年级" },
        { name: "小学三年级" },
        { name: "小学四年级" },
        { name: "小学五年级" },
        { name: "小学六年级" },
        { name: "初中一年级" },
        { name: "初中二年级" },
        { name: "初中三年级" },
      ],
      subject: [
        { name: "请选择学科" },
        { name: "不限" },
        { name: "数学" },
        { name: "语文" },
        { name: "英语" },
        { name: "综合" },
        { name: "编程" },
        { name: "科学" },
      ],
      semester: [
        { name: "请选择学期" },
        { name: "不限" },
        { name: "春季班" },
        { name: "夏季班" },
        { name: "冬季班" },
        { name: "暑假班" },
        { name: "寒假班" },
      ],
      startValue: null,
      endValue: null,
      endOpen: false,
      listData:[],
      columns,
      size: "default",
      selectedData:{
        // school:'',grade:'',subject:'',semester:''
      }
    };
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
      };
    },
  },
  watch: {
    startValue(val) {
      // console.log("startValue", val);
    },
    endValue(val) {
      // console.log("endValue", val);
    },
  },
  methods: {
    schoolChange(value){
      this.selectedData.school=value;
      console.log(value);

    },
    gradeChange(value){
      this.selectedData.grade=value;
      console.log(value);
    },
    subjectChange(value){
      this.selectedData.subject=value;
      console.log(value);

    },
    semesterChange(value){
      this.selectedData.semester=value;
      console.log(value);

    },
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
    AddCourseAction() {
      this.$router.push("add-course");
    },
    handleChange(value) {
      // console.log(`Selected: ${value}`);
    },
    popupScroll() {
      // console.log("popupScroll");
    },
    
    async getData() {
      const result = await http.get(INFO_API,this.listData);
      const { data } = result;
      this.listData = data;
      data.map(item=>{
        if(item.isOpen){
          item.isOpen='已开课'
        }else{
          item.isOpen='未开课'
        }
      })
    },
    removeAction(_id){
      http.post(REMOVE_API,{_id});
      this.getData();
    },
    async selectAction(){
      const result=await http.get(SELECT_API,this.selectedData);
      const {data}=result;
      this.listData=data;
      data.map(item=>{
        if(item.isOpen){
          item.isOpen='已开课'
        }else{
          item.isOpen='未开课'
        }
      })
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 28px;
  font-weight: 700;
}
.header,
.list {
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  .top {
    height: 45px;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    background-color: #f2f2f2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    span {
      font-size: 16px;
      color: #333;
    }
  }
  .content {
    padding: 10px;
    font-size: 14px;
    color: #333;
    .select {
      padding-top: 10px;
    }
    input {
      width: 183px;
      height: 25px;
      padding: 1px;
      color: rgb(153, 153, 153);
      font-size: 13px;
      margin-right: 50px;
    }
  }
}
.list {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
<style lang="scss">
.ant-btn-primary {
  margin-left: 60px;
}
.ant-pagination {
  text-align: right;
  margin-top: 20px;
}
.ant-select {
  margin-right: 10px;
}
</style>
