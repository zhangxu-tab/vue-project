<template>
  <div class="">
    <v-chart :options="options"></v-chart>
  </div>
</template>

<script>
// 导入vue-echarts
import ECharts from 'vue-echarts';

// 按需导入所需工具包
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  name: "",
  data() {
    return {
      options: {
        title: {
          text:'折线图'
        },
        tooltip:{},
        legend:{},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      },
    };
  },
  components: {
      'v-chart':ECharts
  },
};
</script>
<style scoped>
.echarts {
    width: 100%;
    height: 400px;
}
</style>
