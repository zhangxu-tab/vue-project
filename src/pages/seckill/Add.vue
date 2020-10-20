<template>
  <div class="add">
    <el-card>
      <el-form 
      label-width="120px" 
      :model="formData" 
      :rules="formRules"
      ref="addForm"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="formData.title" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <div class="block">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              @change="timeChange"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" prop="first_cateid">
          <el-select @change="firstCateChange" v-model="formData.first_cateid" placeholder="请选择">
            <el-option value label="请选择"></el-option>
            <el-option
              v-for="item in firstCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="second_cateid">
          <el-select @change="secondCateChange" v-model="formData.second_cateid" placeholder="请选择">
            <el-option value label="请选择"></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品" prop="goodsid">
          <el-select v-model="formData.goodsid" placeholder="请选择">
            <el-option value label="请选择"></el-option>
            <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
// 获取商品列表
import {getCateList} from '../../request/category';
// 获取商品列表
import {getGoodsList} from '../../request/goods'

export default {
  name: "add",
  data() {
    return {
      // 一级分类
      firstCateList:[],
      // 二级分类
      secondCateList:[],
      // 商品列表
      goodsList:[],
      // 商品
      goods:[],
      // 和表单元素实现双向数据绑定
      formData: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1, //状态
      },
      // 自定义表单校验规则
      formRules: {
        title:{required:true,message:'请输入活动名称',trigger:'blur'},
        first_cateid:{required:true,message:'请选择',trigger:'blur'},
        second_cateid:{required:true,message:'请选择',trigger:'blur'},
        goodsid:{required:true,message:'请选择',trigger:'blur'}
      },
      // 日期时间选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "1天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [end,start]);
            },
          },
          {
            text: "3天内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [end,start]);
            },
          },
          {
            text: "1周内",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [end,start]);
            },
          },
        ],
      },
      value: []
    };
  },
  async created() {
    const res = await this.$http.all([getCateList(),getGoodsList()]);
    if(res) {
      // 更新分类数组
      // 更新商品数组
      [this.firstCateList,this.goodsList] = res;
    }
  },
  methods: {
    // 一级分类的监听事件
    firstCateChange(id){
      // 通过一级分类的id查找对应的索引值
      const index = this.firstCateList.findIndex(item => item.id == id);
      // 更新二级分类
      this.secondCateList = this.firstCateList[index].children;
    },
    // 二级分类的监听事件
    secondCateChange(id){
      const arr = [];
      this.goodsList.forEach(item => {
        if(item.second_cateid == id) {
          arr.push(item);
        }
      })
      this.goods = arr;
    },
    // 时间日期的监听事件
    timeChange(time){
      const tt = [];
      time.forEach(item => {
        tt.push(item.getTime());
      })
      this.formData.begintime = tt[0];
      this.formData.endtime = tt[1];
    },
    // 提交表单
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if(valid){
          const res = await this.$http.post('/api/seckadd',this.formData);
          if(res.code == 200) {
            this.$success('添加成功！');
            this.$router.push('/seckill');
          }else {
            this.$error('添加失败');
          }
        }else {
          console.log('表单校验失败');
        }
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.addForm.resetFields();
      this.value = [];
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
