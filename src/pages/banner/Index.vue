<template>
  <div class="banner">
    <el-button type="primary" @click="$router.push('/banner/add')" class="btn">
      <i class="el-icon-circle-plus-outline"></i>
      添加轮播
    </el-button>
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="title" label="轮播图名称" min-width="180">
        </el-table-column>
        <el-table-column prop="img" label="图片" min-width="180">
          <template v-slot="scope">
            <el-image style="width:80px" :src="$imgBaseUrl+scope.row.img"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="180"> 
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
            <el-tag type="error" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template v-slot="scope">
                <el-button @click="$router.push('/banner/'+scope.row.id)" type="success" icon="el-icon-edit" size="mini" circle></el-button>
                <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getBannerList} from '../../request/banner';
export default {
  name: "banner",
  data() {
    return {
      list: []
    };
  },
  components: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    del(id) {
      this.$myConfirm(async () => {
        // 请求接口数据，删除服务端的数据
        const res = await this.$http.post('/api/bannerdelete',{id});
        if(res.code == 200){
          this.$success('删除成功');
        }else{
          this.$error('删除失败');
        }
        // 更新视图
        const index = this.list.findIndex(item => item.id == id);
        this.list.splice(index,1);
      })
    },
    async getList() {
      const list = await getBannerList();
      if(list) {
        console.log(list);
        this.list = list;
      }
    }
  },
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
</style>
