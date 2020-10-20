<template>
  <!-- 模板必须有一个唯一的根标签 -->
  <div class="login">
    <!-- 水平垂直居中：1.定位；2.flex弹性布局 -->
    <div class="login-box">
      <h3 class="title">小U商城后台管理系统</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- prop属性是用来和表单校验规则关联的属性 -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="请输入用户名"
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            show-password
            placeholder="请输入密码"
          >
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 和表单进行数据绑定的变量
      ruleForm: {
        username: "",
        password: "",
      },
      // 表单元素的校验规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // 表单校验的过程
      this.$refs[formName].validate(valid => {
        // 说明表单校验成功
        if (valid) {
          this.$http.post("/api/userlogin", this.ruleForm).then((res) => {
            // console.log(res);
            if (res.code == 200) {
              // 将数据接口返回的登录信息保存起来
              sessionStorage.setItem('userinfro',JSON.stringify(res.list))
              // 成功
              this.$router.push('/')
              this.$success('登录成功')
            } else {
              this.$error("登录失败")
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  /* vh是css3中的一个新单位，屏幕高度-->100vh */
  height: 100vh;
  min-width: 970px;
  background: url("../assets/img/loginbg.jpeg");
  /* 覆盖 */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 230px;
  background: #ffffff;
  border-radius: 5px;
  padding: 30px;
}
.title {
  text-align: center;
  color: rgb(64, 158, 255);
  margin-bottom: 30px;
}
.el-button {
  width: 100%;
}
</style>
