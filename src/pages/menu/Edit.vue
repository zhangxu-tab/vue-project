<template>
  <div class="">
    <el-card>
      <el-form
        :model="formData"
        :rules="formRules"
        ref="addForm"
        label-width="120px"
      >
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上级" prop="pid" v-if="formData.type == 2">
          <el-select v-model="formData.pid" placeholder="顶级目录">
            <el-option label="顶级目录" value=""></el-option>
            <el-option
              v-for="item in menulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input
            v-model="formData.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <el-form-item label="图标" prop="icon" v-if="formData.type == 1">
          <el-input
            v-model="formData.icon"
            placeholder="请输入菜单图标"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url" v-if="formData.type == 2">
          <el-input
            v-model="formData.url"
            placeholder="请输入菜单地址"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="submitForm">立即修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入获取菜单列表的方法
import { getMenuList,getMenuById } from "../../request/menu";

export default {
  data() {
    return {
      // 上级菜单列表
      menulist: [],
      // 和表单元素进行双向数据绑定
      formData: {
        id:this.$route.params.id,
        // 0代表顶级菜单
        pid: 0,
        // 标题
        title: "",
        // 图标
        icon: "",
        // 状态1正常 2禁用
        type: 1,
        // 链接地址
        url: "",
        // 状态
        status: 1,
      },
      // 进行表单校验
      formRules: {
        type: { required: true, message: "请选择类型", trigger: "blur" },
        title: { required: true, message: "请选择菜单名称", trigger: "blur" },
        status: { required: true, message: "请选择状态", trigger: "blur" },
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          // 表单校验成功
          const res = await this.$http.post("/api/menuedit", {...this.formData,id:this.$route.params.id});
          if (res.code == 200) {
            this.$router.push('/menu')
            return this.$success("修改成功");
          }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    // 表单重置
    resetForm() {
      this.$refs.addForm.resetFields();
    }
  },
  created() {
    getMenuList().then(res => {
      this.menulist = res
    }),
    getMenuById(this.formData.id).then(res => {
        // 更新数据
        this.formData = res;
    })
  },
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
</style>
