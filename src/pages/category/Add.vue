<template>
  <div class="">
    <el-card>
      <el-form
        label-width="120px"
        :model="formData"
        :rules="formRules"
        ref="addForm"
      >
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="formData.pid" placeholder="请选择">
            <el-option value="" label="请选择"></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input
            v-model="formData.catename"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit="1"
            :on-exceed="limitTip"
            :auto-upload="false"
            :on-change="fileChange"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm" type="primary">立即添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCateList } from "../../request/category";
export default {
  data() {
    return {
      // 一集分类
      list: [],
      // 和表单元素进行双向数据绑定
      formData: {
        // 上级分类编号
        pid: "",
        // 商品分类名称
        catename: "",
        // 图片
        img: "",
        // 状态
        status: 1,
      },
      // 表单校验规则
      formRules: {
        pid: { required: true, message: "请选择", trigger: "blur" },
        catename: {
          required: true,
          message: "请输入分类名称",
          trigger: "blur",
        },
      },
      // 图片上传需要
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取上级分类
    async getList() {
      const list = await getCateList();
      if (list) {
        this.list = list;
      }
    },
    // 限制图片上传个数
    limitTip() {
      this.$error("此处只能上传一张图片");
    },
    // 获取被选择文件的信息
    fileChange(file) {
      // 将图片的原始信息保存到this.formData.img
      this.formData.img = file.raw;
    },
    submitForm() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          // 创建FormData实例对象
          const fd = new FormData();
          for (let key in this.formData) {
            fd.append(key, this.formData[key]);
          }
          const res = await this.$http.post("/api/cateadd", fd);
          if (res.code == 200) {
            this.$success("添加成功");
            this.$router.push("/category");
          } else {
            this.$error("添加失败");
          }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    },
  },
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: auto;
}
</style>
