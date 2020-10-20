<template>
  <div class="index">
    <el-button type="primary" @click="$router.push('/role/add')" class="btn">
      <i class="el-icon-circle-plus-outline"></i>
      添加
    </el-button>
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" min-width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" min-width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="180"> 
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180"> 
          <!-- 旧的方法：slot-scope=''
          新的写法 v-slot
           -->
           <template v-slot='scope'>
              <el-button @click="edit(scope.row.id)" type="success" icon="el-icon-edit" circle size="mini"></el-button>
              <el-button type="warning" icon="el-icon-view" circle size="mini"></el-button>
              <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
           </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getRoleList} from '../../request/role'
export default {
  name: "",
  data() {
    return {
      // 角色列表
      list: []
    };
  },
  components: {},
  created() {
    this.getRoleList();
  },
  mounted() {},
  methods: {
    async getRoleList() {
      const list = await getRoleList();
      console.log(list);
      // 更新数据
      if(list) {
        this.list = list;
      }
    },
    del(id) {
      this.$myConfirm(async () => {
        const res = await this.$http.post('/api/roledelete',{id});
        if(res.code == 200) {
          // 1.成功提示
          this.$success('删除成功');
          // 2.移除页面上被删除的数据
          // 根据id查找索引
          const index = this.list.findIndex(item => item.id == id);
          // 删除数组元素
          this.list.splice(index,1);
        }
      })
    },
    edit(id) {
      this.$router.push(`/role/${id}`);
    }
  },
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
</style>
