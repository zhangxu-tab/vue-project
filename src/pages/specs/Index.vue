<template>
  <div class="">
    <el-button
      type="primary"
      @click="$router.push('/specs/add')"
      class="btn"
    >
      <i class="el-icon-circle-plus-outline"></i>
      添加
    </el-button>
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" min-width="80">
        </el-table-column>
        <el-table-column prop="specsname" label="属性名称" min-width="180">
        </el-table-column>
        <el-table-column prop="attrs" label="属性值" min-width="180"> 
            <template v-slot="scope">
                <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
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
                <el-button @click="$router.push('/specs/'+scope.row.id)" size="mini" type="success" icon="el-icon-edit" circle></el-button>
                <el-button @click="del(scope.row.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getSpecsList } from "../../request/specs";
export default {
  data() {
    return {
      // 规格列表
      list: [],
      page: 1,
      size: 2,
    };
  },
  created() {
    this.getSpeList();
  },
  methods: {
    del(id) {
      this.$myConfirm(async () => {
        // 请求接口数据，删除服务端的数据
        const res = await this.$http.post('/api/specsdelete',{id});
        if(res.code == 200) {
          this.$success('删除成功');
        }else {
          this.$error('删除失败');
        }
        // 更新视图
        const index = this.list.findIndex(item => item.id == id);
        this.list.splice(index,1);
      })
    },
    // 获取规格列表
    async getSpeList() {
      const list = await getSpecsList({ page: this.page, size: this.size });
      if (list) {
        // console.log(list);
        this.list = list;
      }
    },
  },
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
.el-tag {
    margin: 0 2px;
}
</style>
