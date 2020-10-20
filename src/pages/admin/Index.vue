<template>
  <div class="">
    <el-button type="primary" @click="$router.push('/admin/add')" class="btn">
      <i class="el-icon-circle-plus-outline"></i>
      添加
    </el-button>
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="用户ID" width="180"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="180"> </el-table-column>
        <el-table-column prop="rolename" label="角色名称"> </el-table-column>
        <el-table-column prop="status" label="状态"> 
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
            <el-tag type="error" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"> 
          <template v-slot='scope'>
              <el-button @click="edit(scope.row.uid)" type="success" icon="el-icon-edit" circle size="mini"></el-button>
              <el-button @click="del(scope.row.uid)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="pageUpdate" background layout="prev, pager, next" :total="total" :page-size="size">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getAdminList,getAdminCount } from "../../request/admin";
export default {
  data() {
    return {
      // 列表数组
      list: [],
      // 页码
      page: 1,
      // 每页显示的数据条数
      size: 2,
      // 数据总条数
      total: 1000,
    };
  },
  created() {
    this.getList();
    this.getCount();
  },
  methods: {
    // 获取管理员信息
    async getList() {
      const list = await getAdminList({ page: this.page, size: this.size });
      // console.log(list);
      if (list) {
        // 更新列表数据
        this.list = list;
      }
    },
    // 获取管理员的总条数
    async getCount() {
      const total = await getAdminCount();
      if(total) {
        // console.log(total);
        this.total = total[0].total;
      }
    },
    del(uid) {
      this.$myConfirm(async () => {
        const res = await this.$http.post('/api/userdelete',{uid});
        if(res.code == 200) {
          // 根据id查找下标
          const index = this.list.findIndex(item => item.uid == uid);
          // 删除列表数据
          this.list.splice(index,1);
          return this.$success('删除成功');
        }
        this.$error('删除失败');
      })
    },
    edit(uid) {
      this.$router.push('/admin/'+uid)
    },
    // 页码更新回调函数
    pageUpdate(page) {
      // 1.更新页码
      this.page = page;
      // 2.重新请求列表数据
      this.getList();
    }
  },
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
