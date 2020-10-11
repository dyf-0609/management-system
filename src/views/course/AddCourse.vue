<template>
  <div class="add-course">
    <div class="header">
      <h1>新增课程</h1>
      <a-button type="primary" @click="goBackAction">返回</a-button>
    </div>
    <div class="content">
      <p>
        <label for="">课程编号<sup>*</sup></label>
        <a-input placeholder="请输入..." />
      </p>
      <p>
        <label for="">课程名称<sup>*</sup></label>
        <a-input placeholder="请输入..." />
      </p>
      <p>
        <label for="">列表图</label>
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
        <span class="tip" style="display:block; margin-left:120px">建议尺寸120*90像素，大小不要超过1M</span>
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
          @change="handleChange"
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
          @change="handleChange"
        >
          <a-select-option v-for="item in semester" :key="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </p>
      <p>
        <label for="">价格<sup>*</sup></label>
        <a-input placeholder="0.00" style="width:200px"/> 元
      </p>
      <p>
        <label for="">名额<sup>*</sup></label>
        <a-input placeholder="0" style="width:200px" /> 人
      </p>
      <p>
        <label for="">学科<sup>*</sup></label>
        <a-select
          :size="size"
          default-value="请选择学科"
          style="width: 200px"
          @change="handleChange"
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
          default-checked
        />
      </p>
      <p>
        <label for="">是否推荐到首页<sup>*</sup></label>
        <a-radio-group name="radioGroup">
          <a-radio :value="1"> 是 </a-radio>
          <a-radio :value="2"> 否 </a-radio>
        </a-radio-group>
      </p>
      <p>
        <label for="">是否立即开课<sup>*</sup></label>
        <a-radio-group name="radioGroup">
          <a-radio :value="1"> 是 </a-radio>
          <a-radio :value="2"> 否 </a-radio>
        </a-radio-group>
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
        <a-input placeholder="0"  style="width: 200px"/>
      </p>
      <p>
        <label for="">课程介绍<sup>*</sup></label>
        <a-textarea :rows="4" />
      </p>
      <p>
        <label for="">课程大纲<sup>*</sup></label>
        <a-form-model
          ref="dynamicValidateForm"
          :model="dynamicValidateForm"
          v-bind="formItemLayoutWithOutLabel"
        >
          <a-form-model-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :key="domain.key"
            v-bind="index === 0 ? formItemLayout : {}"
            :label="index === 0 ? '第'+(index+1)+'讲' : ''"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '输入不能为空',
              trigger: 'blur',
            }"
          >
            <a-input
              v-model="domain.value"
              style="width: 60%; margin-right: 8px"
            />
            <a-icon
              v-if="dynamicValidateForm.domains.length > 1"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="dynamicValidateForm.domains.length === 1"
              @click="removeDomain(domain)"
            />
          </a-form-model-item>
          <a-form-model-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="solid" style="width: 16px; border-radius:50%; " @click="addDomain">
              <a-icon type="plus" style="margin-left:-6px"/> 
            </a-button>
          </a-form-model-item>
          <a-form-model-item v-bind="formItemLayoutWithOutLabel">
            <a-button
              type="primary"
              html-type="submit"
              @click="submitForm('dynamicValidateForm')"
            >
              提交
            </a-button>
            <a-button
              style="margin-left: 50px"
              @click="resetForm('dynamicValidateForm')"
            >
              取消
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </p>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Input,
  Upload,
  Icon,
  Checkbox,
  Row,
  Col,
  Switch,
  Radio,
  DatePicker,
  Select,
  Form,
  FormModel
} from "ant-design-vue";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
console.log(Form);
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
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    },
  },
  methods: {
    goBackAction() {
      this.$router.back();
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    onChange(checkedValues) {
      console.log("checked = ", checkedValues);
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
    handleChange(value) {
      console.log(`Selected: ${value}`);
    },
    popupScroll() {
      console.log("popupScroll");
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