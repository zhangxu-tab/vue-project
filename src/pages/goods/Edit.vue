<template>
  <div class="">
    <el-card>
      <el-form 
      label-width="120px"
      :model="formData"
      :rules="rules"
      ref="addForm"
      >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
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
              <el-select v-model="formData.second_cateid" placeholder="请选择">
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
            <el-form-item label="商品名称" prop="goodsname">
              <el-input v-model="formData.goodsname" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="formData.price" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="市场价格" prop="market_price">
              <el-input v-model="formData.market_price" placeholder="请输入市场价格"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="img">
              <el-upload
                action="#"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"               
                :auto-upload="false"
                :limit="1"
                :on-exceed="limitTip"
                :on-change="fileChange"
                :file-list="imgList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="商品规格" prop="specsid">
              <el-select @change="specsChange" v-model="formData.specsid" placeholder="请选择">
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="item in specsList"
                  :key="item.id"
                  :label="item.specsname"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规格属性值" prop="specsattr">
              <el-select v-model="formData.specsattr" placeholder="请选择" multiple>
                <el-option value label="请选择"></el-option>
                <el-option
                  v-for="(item,index) in specsAttr"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否新品" prop="isnew">
              <el-radio-group v-model="formData.isnew">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否热卖" prop="ishot">
              <el-radio-group v-model="formData.ishot">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formData.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="详细描述" name="second">
              <el-form-item prop="description" label-width="0">
                  <vueWangeditor ref="editor" width="100%" style="height:500px" v-model="formData.description" id="editor" />
              </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item>
            <el-button @click="submitForm" type="success">立即修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入vue-wangeditor
import vueWangeditor from 'vue-wangeditor';

import $axios from '../../common/http'

// 获取商品分类
import {getCateList} from '../../request/category'
// 获取规格列表
import {getSpecsList} from '../../request/specs'

// 获取当前被编辑的商品信息
import { getGoodsById } from "../../request/goods";

export default {
  name: "",
  data() {
    const validDesc = (rule,value,callback) => {
      const html = this.$refs.editor.getHtml();
      // console.log(html);  //<p><br></p>
      if(html.trim() == '<p><br></p>') {
        return callback(new Error('请输入商品描述'));
      }
      callback();
    }
    return {
      // 一级分类
      firstCateList:[],
      // 二级分类
      secondCateList:[],
      // 商品规格列表
      specsList: [],
      // 规格属性值
      specsAttr:[],
      // 和表单元素实现双向数据绑定
      formData: {
        id:this.$route.params.id,
        first_cateid: '',   //一级分类id
        second_cateid:'',   // 二级分类id
        goodsname:'',  // 商品名称
        price:'',  // 商品价格
        market_price:'',  // 市场价格
        img:'',  // 商品图片
        description:'',  // 商品描述
        specsid: "", // 规格id
        specsattr: [], // 规格属性值
        isnew: "", // 是否新品
        ishot: "", // 是否热卖
        status: "" // 状态
      },
      // 表单校验规则
      rules: {
        first_cateid:{required:true,message:"请选择",trigger:'blur'},
        second_cateid:{required:true,message:"请选择",trigger:'blur'},
        goodsname:{required:true,message:"请输入商品名称",trigger:'blur'},
        price:{required:true,message:"请输入商品价格",trigger:'blur'},
        market_price:{required:true,message:"请输入市场价格",trigger:'blur'},
        // 自定义校验规则
        description:{validator:validDesc,trigger:'blur'},
        specsid:{required:true,message:"请选择",trigger:'blur'},
        specsattr:{required:true,message:"请选择",trigger:'blur'},
        isnew:{required:true,message:"请选择",trigger:'blur'},
        ishot:{required:true,message:"请选择",trigger:'blur'},
        status:{required:true,message:"请选择",trigger:'blur'}
      },
      // tab标签页
      activeName: "first",
      // 图片上传组件
      dialogImageUrl: "",
      dialogVisible: false,
      imgList:[]
    };
  },
  components: {
      vueWangeditor
  },
  async created() {
      // axios.all();
      const res = await $axios.all([
          getCateList(),
          getSpecsList(),
          getGoodsById(this.formData.id)
      ]);
      if(res) {
        // 更新分类数组
        // 更新规格数组
        [this.firstCateList,this.specsList,this.formData] = res;
        
        // 商品图片列表
        this.imgList = [{url: this.$imgBaseUrl + this.formData.img}];

        // 获取二级分类
        this.firstCateChange(this.formData.first_cateid);

        // 获取规格列表
        this.specsChange(this.formData.specsid,false);
        // 获取规格属性值  '白色,黑色' => ['白色','黑色']
        this.formData.specsattr = this.formData.specsattr.split(",");

        // 手动设置富文本编辑器的内容
        this.$refs.editor.setHtml(this.formData.description);
      }
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if(valid) {
          // 创建formdata实例
          const fd = new FormData();
          for(let key in this.formData) {
            fd.append(key,this.formData[key]);
          }
          fd.append("id",this.$route.params.id);
          // 手动获取富文本编辑器的内容
          fd.append('description',this.$refs.editor.getHtml());

          const res = await this.$http.post('/api/goodsedit',fd);
          if(res.code == 200) {
            this.$success('编辑成功');
            this.$router.push('/goods');
          }else {
            this.$error('添加失败');
          }
        }
      })
    },
    // 一级分类数据的监听事件
    firstCateChange(id) {
        // console.log(id);  //目前的选中值

        // 通过一级分类的id查找对应索引
        const index = this.firstCateList.findIndex(item => item.id == id);
        // 更新二级分类
        // console.log(this.firstCateList[index]);
        this.secondCateList = this.firstCateList[index].children;
    },
    // 商品规格的监听事件
    specsChange(id,isReset = true) {
        // 根据商品规格列表的id查找对应索引
        const index = this.specsList.findIndex(item => item.id == id);
        // 更新规格属性值的数组
        // console.log(this.specsList[index]);
        this.specsAttr = this.specsList[index].attrs;
        // 清空已经选择的规格属性
        if(isReset) {
            this.formData.specsattr = [];
        }
    },
    // 图片个数限制的提示
    limitTip() {
        this.$error("此处最多只能上传一张图片");
    },
    // 监听文件域的更新
    fileChange(file) {
        this.formData.img = file.raw;
    },
    // tab标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 图片上传组件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
.el-tab{ 
    width: 600px;
    margin: auto;
}
</style>
