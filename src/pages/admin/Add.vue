<template>
  <div class="add">
    <el-card>
      <el-form
        label-width="120px"
        :model="formData"
        :rules="formRules"
        ref="addForm"
      >
        <el-form-item label="角色名称" prop="roleid">
          <el-select v-model="formData.roleid" placeholder="请选择">
            <el-option value="" label="请选择"></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="formData.username" placeholder="请输入管理员名称"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="primary">立即添加</el-button>
          <el-button @click="resetForm" type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {getRoleList} from '../../request/role'
export default {
  name: "add",
  data() {
    return {
      // 角色列表
      rolelist: [],
      formData: {
          // 角色编号
          roleid: '',
          // 管理员名称
          username: '',
          // 密码
          password: '',
          // 状态
          status: 1
      },
      // 校验规则
      formRules: {
          roleid:{required:true,message:'请选择角色',trigger:'blur'},
          username:{required:true,message:'请输入管理员名称',trigger:'blur'},
          password:{required:true,message:'请选择密码',trigger:'blur'},
          status:{required:true,message:'请选择',trigger:'blur'}
      },
    };
  },
  created() {
      this.getRole();
  },
  methods: {
      // 获取角色列表
      async getRole() {
          const list = await getRoleList();
          if(list) {
              this.rolelist = list;
          }
      },
      // 表单提交
      submitForm() {
          this.$refs.addForm.validate(async valid => {
              if(valid) {
                  const res = await this.$http.post('/api/useradd',this.formData);
                  if(res.code == 200) {
                      this.$success('添加成功');
                      this.$router.push('/admin');
                  }else {
                      this.$error('添加失败');
                  }
              }else {
                  console.log("表单校验失败");
              }
          })
      },
      // 表单重置
      resetForm() {
          this.$refs.addForm.resetFields();
      }
  },
};
</script>
<style scoped>
.el-form {
    width: 600px;
    margin: auto;
}
</style>
