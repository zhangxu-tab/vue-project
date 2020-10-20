<template>
  <div class="edit">
    <el-card>
      <el-form 
      label-width="120px" 
      :model="formData" 
      :rules="rules"
      ref="addForm"
      >
        <el-form-item label="轮播图名称" prop="title">
          <el-input v-model="formData.title" placeholder="请输入轮播图名称"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片" prop="img">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="limitTips"
            :on-change="fileChange"
            :file-list="imgList"
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
          <el-button type="success" @click="submitForm">立即修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {getBannerList,updataBannerInfo,getBannerById} from '../../request/banner'
export default {
  name: "add",
  data() {
    return {
      formData: {
          id:this.$route.params.id,
          title:'',
          img:'',
          status:1
      },
      imgList:[],
      rules:{
        title:{required:true,message:'请输入轮播图名称',trigger:'blur'},
        img:{required:true,message:'请输入轮播图名称',trigger:'blur'},
        status:{required:true,message:'请选择状态',trigger:'blur'}
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    this.getListById();
  },
  methods: {
    // 获取当前编辑的信息
    async getListById(){
      const res = await getBannerById(this.formData.id);
      if(res){
        this.formData = res;
        // 更新imgList
        this.imgList = res.img == '' ? [] : [{url:this.$imgBaseUrl+res.img}];
      }
    },
    // 提交表单
    submitForm() {
        this.$refs.addForm.validate(async valid => {
            if(valid) {
                // 创建FormData实例对象
                const fd = new FormData();
                for(let k in this.formData) {
                    fd.append(k,this.formData[k]);
                }
                fd.append("id",this.$route.params.id);
                const res = await this.$http.post('/api/banneredit',fd);
                if(res.code == 200) {
                    this.$router.push('/banner');
                    this.$success('轮播图编辑成功');
                }else {
                    this.$error('轮播图编辑失败');
                }
            }else {
                console.log('error submit');
            }
        })
    },
    resetForm() {
        this.$refs.addForm.resetFields();
        this.imgList = [];
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    limitTips() {
        this.$error('只能上传一张图片');
    },
    fileChange(file) {
        this.formData.img = file.raw;
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
