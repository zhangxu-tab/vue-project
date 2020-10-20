<template>
  <div class="skill">
    <el-button type="primary" @click="$router.push('/seckill/add')" class="btn">
      <i class="el-icon-circle-plus-outline"></i>
      添加秒杀
    </el-button>
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="title" label="活动名称" min-width="180">
        </el-table-column>
        <el-table-column prop="begintime" label="开始时间" min-width="180">
            <template v-slot="scope">
                <div>{{scope.row.begintime | changeTime}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="endtime" label="结束时间" min-width="180"> 
            <template v-slot="scope">
                <div>{{scope.row.endtime | changeTime}}</div>
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
                <el-button @click="$router.push('/seckill/'+scope.row.id)" type="success" icon="el-icon-edit" circle size="mini"></el-button>
                <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
            </template> 
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getSeckList} from '../../request/seckill'
export default {
  name: "",
  data() {
    return {
        list:[]
    };
  },
  created() {
      this.getList();
  },
  methods: {
    // 获取秒杀列表
    async getList(){
        const res = await getSeckList();
        if(res) {
            this.list = res;
        }
    },
    del(id) {
      this.$myConfirm(async () => {
        const res = await this.$http.post('/api/seckdelete',{id});
        if(res.code == 200) {
          // 根据id查找下标
          const index = this.list.findIndex(item => item.id == id);
          // 删除列表数据
          this.list.splice(index,1);
          return this.$success('删除成功！');
        }
        this.$error('删除失败！');
      })
    }
  },
  filters:{
      changeTime(time){
        let tt = new Date(Number(time));
        let year = tt.getFullYear();
        let month = tt.getMonth() + 1;
        month = month < 10 ? '0'+month : month;
        let day = tt.getDate();
        day = day < 10 ? '0'+day : day;
        let hour = tt.getHours();
        hour = hour < 10 ? '0'+hour : hour;
        let min = tt.getMinutes();
        min = min < 10 ? '0'+min : min;
        let sec = tt.getSeconds();
        sec = sec < 10 ? '0'+sec : sec;

        return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
      }
  }
};
</script>
<style scoped>
.btn {
  margin-bottom: 15px;
}
</style>
