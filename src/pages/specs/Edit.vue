<template>
  <div class="">
    <el-card>
      <el-form
        label-width="120px"
        :model="formData"
        :rules="rules"
        ref="addForm"
      >
        <el-form-item label="属性名" prop="specsname">
          <el-input
            placeholder="请输入属性名"
            v-model="formData.specsname"
          ></el-input>
        </el-form-item>
        <el-form-item label="属性值" prop="attrs">
          <div class="box" v-for="(item, index) in attrList" :key="index">
            <el-input
              placeholder="请输入属性值"
              v-model="item.value"
            ></el-input>
            <el-button @click="addAttr" type="success" v-if="index == 0"
              >添加属性</el-button
            >
            <el-button @click="delAttr(index)" type="danger" v-else
              >删除属性</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="success">立即修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getSpecsById } from "../../request/specs";
export default {
  name: "",
  data() {
    // 自定义表单校验规则
    var validateAttr = (rule, value, callback) => {
      // console.log(this.attrList);
      this.attrList.forEach((item) => {
        if (item.value == "") {
          callback(new Error("请输入属性值"));
        }
      });
      // 无论成功与否，都应该调用callback
      callback();
    };
    return {
      attrList: [{ value: "" }],
      // 定义双向数据绑定模型
      formData: {
        // 获取当前被编辑的规格id
        id:this.$route.params.id,
        // 属性名称
        specsname: "",
        // 属性值
        attrs: "",
        // 状态
        status: 1,
      },
      // 表单校验规则
      rules: {
        specsname: { required: true, message: "请输入属性名", trigger: "blur" },
        // 自定义的表单校验规则
        attrs: { validator: validateAttr, trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  created() {
      this.getInfro();
  },
  methods: {
    async getInfro() {
        const infro = await getSpecsById(this.formData.id);
        if(infro) {
            console.log(infro);
            this.formData = infro[0];
            this.attrList = infro[0].attrs.map(item => ({value:item}));
        }
    },
    // 添加属性
    addAttr() {
      if (this.attrList.length >= 5) {
        return false;
      }
      this.attrList.push({ value: "" });
    },
    // 删除属性
    delAttr(index) {
      this.attrList.splice(index, 1);
    },
    // 提交表单
    submitForm() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          this.formData.attrs = this.attrList.map((item) => item.value).join(",");
          const res = await this.$http.post("/api/specsedit", this.formData);
          if (res.code == 200) {
            this.$router.push("/specs");
            return this.$success("添加成功");
          } else {
            this.$error("添加失败");
          }
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.addForm.resetFields();
      this.attrList = [{ value: "" }];
    },
  },
};
</script>
<style scoped>
/* 
样式添加作用域的原理：
给style标签添加scoped属性之后，当前组件中样式选择器会被改写，
改写成一个交集选择器，类似这样 .box => .box[data-v-7059db36]
 */
.el-form {
  width: 600px;
  margin: auto;
}
.box {
  width: 410px;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.box .el-input {
  width: 300px;
}
</style>
