<template>
  <div class="">
    <el-button type="primary" @click="$router.push('/category/add')" class="btn">
      <i class="el-icon-circle-plus-outline"></i>
      添加
    </el-button>
    <el-card>
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="id" label="ID" min-width="100">
        </el-table-column>
        <el-table-column prop="catename" label="分类名称" min-width="100">
        </el-table-column>
        <el-table-column prop="img" label="分类图片" min-width="180">
          <template v-slot="scope">
            <el-image
              v-if="scope.row.img != ''"
              style="width: 80px; height: 80px"
              :src="$imgBaseUrl + scope.row.img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="180">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" min-width="180">
          <template v-slot="scope">
            <el-button
              @click="edit(scope.row.id)"
              size="mini"
              type="success"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              @click="del(scope.row.id)"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getCateList } from "../../request/category";
export default {
  name: "",
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await getCateList();
      if (res) {
        this.list = res;
      }
    },
    del(id) {
      this.$myConfirm(async () => {
        const res = await this.$http.post("/api/catedelete", { id });
        if (res.code == 200) {
          this.$success("删除成功");
          const index = this.list.findIndex((item) => item.id == id);
          this.list.splice(index, 1);
        } else {
          this.$error("删除失败");
        }
      });
    },
    edit(id) {
        this.$router.push(`/category/${id}`)
    },
  },
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
</style>
