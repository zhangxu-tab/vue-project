<template>
  <div class="">
    <el-button type="primary" @click="$router.push('/goods/add')" class="btn">
      <i class="el-icon-circle-plus-outline"></i>
      添加
    </el-button>
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="firstcatename" label="一级分类" min-width="120">
        </el-table-column>
        <el-table-column prop="secondcatename" label="二级分类" min-width="120">
        </el-table-column>
        <el-table-column prop="goodsname" label="商品名称" min-width="120">
        </el-table-column>
        <el-table-column prop="img" label="商品图片" min-width="120">
            <template v-slot="scope">
                <el-image
                    style="width: 80px"
                    :src="$imgBaseUrl+scope.row.img"
                    >
                </el-image>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="销售价格" min-width="120">
            <template v-slot="scope">
                <span style="color:red">&yen;{{scope.row.price}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="market_price" label="市场价格" min-width="120">
            <template v-slot="scope">
                <span style="color:red">&yen;{{scope.row.market_price}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="isnew" label="是否新品" min-width="120">
            <template v-slot="scope">
                <!-- 
                    active-color：激活状态的颜色
                    inactive-color：未激活的颜色
                    active-value：激活状态的值
                    inactive-value：未激活状态的值
                 -->
                <el-tooltip :content="scope.row.isnew == 1 ? '是' : '否'" placement="top">
                    <el-switch
                        v-model="scope.row.isnew"
                        active-color="#13ce66"
                        inactive-color="#cccccc"
                        :active-value="1"
                        :inactive-value="0"
                        @change="changeState(scope.row,'isnew')"
                    >
                    </el-switch>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="ishot" label="是否热卖" min-width="120">
            <template v-slot="scope">
                <el-tooltip :content="scope.row.ishot == 1 ? '是' : '否'" placement="top">
                    <el-switch
                        v-model="scope.row.ishot"
                        active-color="#13ce66"
                        inactive-color="#cccccc"
                        :active-value="1"
                        :inactive-value="0"
                        @change="changeState(scope.row,'ishot')"
                    >
                    </el-switch>
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="120">
            <template v-slot="scope">
                <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
                <el-tag type="error" v-else>禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120" fixed="right"> 
            <template v-slot="scope">
                <el-button @click="$router.push('/goods/'+scope.row.id)" type="success" icon="el-icon-edit" size="mini" circle></el-button>
                <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination 
        background 
        layout="sizes,prev, pager, next,total" 
        :page-sizes="[2,5,10,15]"
        :total=total
        :page-size=size
        @current-change='pageChange'
        @size-change="sizeChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList,getGoodsTotal,updateGoodsInfro } from "../../request/goods";
export default {
  name: "",
  data() {
    return {
      // 商品列表
      list: [],
      // 页码
      page: 1,
      // 每页显示的个数
      size: 5,
      // 数据总数
      total: 0
    };
  },
  created() {
    this.getList();
    this.getCount();
  },
  methods: {
    // 获取商品列表
    async getList() {
      const list = await getGoodsList({ page: this.page, size: this.size });
      if (list) {
        // 更新列表数据
        this.list = list;
      }
    },
    // 更新总条数
    async getCount() {
        const total = await getGoodsTotal();
        this.total = total;
    },
    // 页码page更新的事件函数
    pageChange(page) {
        // 更新页码
        this.page = page;
        // 重新请求商品列表
        this.getList();
    },
    // 每页显示条数的更新
    sizeChange(size) {
        // 更新size
        this.size = size;
        // 重新请求商品列表
        this.getList();
    },
    // 更新状态（isnew,ishot）
    async changeState(infro,attr) {
        // console.log(infro,attr);
        let postData = { id : infro.id };
        postData[attr] = infro[attr];
        const res = await updateGoodsInfro(postData);
        if(res) {
            this.$success('更新成功');
        }else {
            this.$error('更新失败');
        }
    },
    // 删除商品
    del(id) {
      this.$myConfirm(async () => {
        // 请求数据接口，删除服务端的数据
        const res = await this.$http.post('/api/goodsdelete',{id});
        // 更新视图
        if(res.code == 200) {
          const index = this.list.findIndex(item => item.id == id);
          this.list.splice(index,1);
          this.$success('删除成功');
        }else {
          this.$error('删除失败');
        }
      })
    }
  },
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
.el-pagination {
    margin-top: 15px;
}
</style>
