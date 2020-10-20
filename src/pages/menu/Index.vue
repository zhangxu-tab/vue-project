<template>
  <div class="index">
    <el-button type="primary" @click="$router.push('/menu/add')" class="btn">
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
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>

        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>

        <el-table-column prop="type" label="类型">
          <template slot-scope="$scope">
            <el-tag type="success" v-if="$scope.row.type == 1">目录</el-tag>
            <el-tag type="primary" v-if="$scope.row.type == 2">菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="icon" label="图标">
          <!-- 作用域插槽
          scope是一个模板变量
          scope代表的就是循环遍历的数组
           -->
           <template slot-scope="$scope">
             <!-- scope.row 代表的是列表数据的每一行{} -->
             <i :class="$scope.row.icon"></i>
           </template>
        </el-table-column>
        <el-table-column prop="url" label="地址"> </el-table-column>

        <el-table-column prop="status" label="状态"> 
          <template slot-scope="$scope">
            <el-tag type="success" v-if="$scope.row.status == 1">已启用</el-tag>
            <el-tag type="danger" v-if="$scope.row.status == 2">禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="操作"> 
          <template slot-scope="$scope">
            <el-button @click="edit($scope.row.id)" type="success" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click="del($scope.row.id)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.$http.get('/api/menulist?istree=1').then(res => {
        console.log(res);
        if(res.code == 200) {
          // 更新数据
          this.list = res.list
        }
      })
    },
    del(id) {
      this.$myConfirm(async () => {
        const res = await this.$http.post('/api/menudelete',{id:id});
        if(res.code == 200) {
          this.$success('删除成功')
          // 刷新列表的数据
          // 1.重新请求数据列表  this.getMenuList()
          // 2.直接删除数组中对应的元素 splice(index,1)

          // 通过id查找索引号
          const index = this.list.findIndex(item => item.id == id)
          // 删除数组元素，界面层会自动刷新
          this.list.splice(index,1)
        }else {
          this.$error('删除失败')
        }
      })
    },
    edit(id) {
      this.$router.push('/menu/'+id)
    }
  },
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
</style>
