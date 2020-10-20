<template>
  <div class="member">
    <el-card>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="uid" label="用户ID" min-width="250">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" min-width="100">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="180"> 
        </el-table-column>
        <el-table-column prop="addtime" label="注册日期" min-width="180">
          <template v-slot="scope">
            <div>{{scope.row.addtime | timeChange}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
            <el-button type="success" icon="el-icon-edit" circle size="mini"></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getMemberList} from '../../request/member';
export default {
  name: "member",
  data() {
    return {
        timeCount:[],
        list:[]
    };
  },
  created() {
      this.getList();
  },
  methods: {
      async getList() {
        const list = await getMemberList();
        if(list) {
            this.list = list;
        }
      }
  },
  filters:{
    timeChange(time) {
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
.cell {
    width: 100%;
    text-align: center;
}
</style>
