<template>
  <div class="add-course">
    <div class="header">
      <h1>新增课程</h1>
      <a-button type="primary" @click="goBackAction">返回</a-button>
    </div>
    <div class="content">
      <p>
        <label for="">课程编号<sup>*</sup></label>
        <a-input placeholder="请输入..."  v-model="formData.course_id"/>
      </p>
      <p>
        <label for="">课程名称<sup>*</sup></label>
        <a-input placeholder="请输入..."  v-model="formData.course_name"/>
      </p>
      <p>
        <label for="">校区<sup>*</sup></label>
        <a-checkbox-group @change="onChange">
          <a-row>
            <a-col :span="8" v-for="item in school" :key="item.name" style="width:120px">
              <a-checkbox :value="item.name">
                {{ item.name }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </p>
      <p>
        <label for="">年级<sup>*</sup></label>
        <a-select
          :size="size"
          default-value="请选择年级"
          style="width: 200px"
          @change="gradeChange"
        >
          <a-select-option v-for="item in grade" :key="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label for="">学期<sup>*</sup></label>
        <a-select
          :size="size"
          default-value="请选择学期"
          style="width: 200px"
          @change="semesterChange"
        >
          <a-select-option v-for="item in semester" :key="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label for="">价格<sup>*</sup></label>
        <a-input placeholder="0.00" style="width:200px" v-model="formData.price"/> 元
      </p>
      <p>
        <label for="">名额<sup>*</sup></label>
        <a-input placeholder="0" style="width:200px" v-model="formData.quota"/> 人
      </p>
      <p>
        <label for="">学科<sup>*</sup></label>
        <a-select
          :size="size"
          default-value="请选择学科"
          style="width: 200px"
          @change="subjectChange"
        >
          <a-select-option v-for="item in subject" :key="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label for="">是否上架<sup>*</sup></label>
        <a-switch
          checked-children="ON"
          un-checked-children="OFF"
          
          @change="saleChange" 
        />
      </p>
      <p>
        <label for="">是否立即开课<sup>*</sup></label>
       <a-radio-group
          :options="plainOptions1"
          :default-value="value1"
          @change="onChange1"
        />
      </p>
      <p>
        <label for="">课程日期<sup>*</sup></label>
        <a-date-picker
          style="width:110px"
          v-model="startValue"
          :disabled-date="disabledStartDate"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="开始时间"
          @openChange="handleStartOpenChange"
        />
        ——
        <a-date-picker
          style="width:110px"
          v-model="endValue"
          :disabled-date="disabledEndDate"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="结束时间"
          :open="endOpen"
          @openChange="handleEndOpenChange"
        />
      </p>
      <p>
        <label for="">课时<sup>*</sup></label>
        <a-input placeholder="0"  style="width: 200px" v-model="formData.class_hour"/>
      </p>
      <p>
        <label for="">课程介绍<sup>*</sup></label>
        <a-textarea :rows="4" v-model="formData.course_intro"/>
      </p>
      <p>
        <a-button type="primary" @click="submitAction">提交</a-button>
        <a-button type="primary" @click="goBackAction">取消</a-button>
      </p>
    </div>
  </div>
</template>

<script>
import http from '../../api/http'
import {ADDCOURSE_API} from '../../api/url'
import {
  Button,Input,Upload,Icon,Checkbox,Row,Col,Switch,Radio,DatePicker,Select,Form,FormModel
} from "ant-design-vue";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const plainOptions1 = ["否", "是"];
export default {
  components: {
    [Button.name]: Button,
    [Input.name]: Input,
    [Upload.name]: Upload,
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    [Checkbox.Group.name]: Checkbox.Group,
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch,
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group,
    [DatePicker.name]: DatePicker,
    [Input.TextArea.name]: Input.TextArea,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [Form.name]: Form,
    [FormModel.name]:FormModel,
    [FormModel.Item.name]:FormModel.Item
  },
  data() {
    return {
      plainOptions1,
      value1:'否',
      formData:{
        course_id:'',course_name:'',school:[],grade:'',semester:'',price:'',quota:'',subject:'',isSale:false,isOpen:false,course_date:{},class_hour:'',course_intro:''
      },
      loading: false,
      imageUrl: "",
      school: [
        { name: "海淀校区" },
        { name: "朝阳校区" },
        { name: "西城校区" },
        { name: "东城校区" },
        { name: "石景山校区" },
        { name: "丰台校区" },
      ],
      grade: [
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
      semester: [
        { name: "不限" },
        { name: "春季班" },
        { name: "夏季班" },
        { name: "冬季班" },
        { name: "暑假班" },
        { name: "寒假班" },
      ],
      subject: [
        { name: "不限" },
        { name: "数学" },
        { name: "语文" },
        { name: "英语" },
        { name: "综合" },
        { name: "编程" },
        { name: "科学" },
      ],
      startValue: null,
      endValue: null,
      endOpen: false,
      size: "default",
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      dynamicValidateForm: {
        domains: [],
      },
    };
  },
  watch: {
    startValue(val) {
      if(!val){
        return
      }else{
        // console.log(val._d.getFullYear()+'-'+(val._d.getMonth()+1)+'-'+val._d.getDate());
        const start=val._d.getFullYear()+'-'+(val._d.getMonth()+1)+'-'+val._d.getDate();
        this.formData.course_date.start=start;
      } 
    },
    endValue(val) {
      if(!val){
        return
      }else{
        console.log(val._d.getFullYear()+'-'+(val._d.getMonth()+1)+'-'+val._d.getDate());
        const end=val._d.getFullYear()+'-'+(val._d.getMonth()+1)+'-'+val._d.getDate();
        this.formData.course_date.end=end;
      }
    },
  },
  methods: {
    saleChange(checked) {
      // console.log(`a-switch to ${checked}`);
      this.formData.isSale=`${checked}`
    },
    onChange1(e){
      // console.log(e.target.value);
      if (e.target.value === "是") {
        this.formData.isOpen = true;
        
      }
    },
    goBackAction() {
      this.$router.back();
    },
    onChange(checkedValues) {
      this.formData.school=checkedValues;
      // console.log("checked = ", checkedValues);
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
    gradeChange(value) {
      this.formData.grade=`${value}`
      // console.log(`Selected: ${value}`);
    },
    semesterChange(value) {
      this.formData.semester=`${value}`
      // console.log(`Selected: ${value}`);
    },
    subjectChange(value) {
      this.formData.subject=`${value}`
      // console.log(`Selected: ${value}`);
    },
    popupScroll() {
      // console.log("popupScroll");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
    async submitAction(){
      // console.log(this.formData);
     const result= await http.post(ADDCOURSE_API,this.formData);
     this.$router.push({name:'course-list'})
    }
  },
};
</script>

<style lang="scss" scoped>
.add-course {
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
  .content {
    width: 100%;
    padding: 20px;
    min-height: 500px;
    border: 1px solid #ddd;
    p{
        margin-left: 20px;
        label{
            display: inline-block;
            margin-right: 10px;
            width: 110px;
            text-align: center;
            color: #000;
            sup{
                color: red;
            }
        }
        input{
            width: 270px;
            height: 30px;
        }
        span{
            width: 270px;
        }
    }
    
  }
}
</style>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>