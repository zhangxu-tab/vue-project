<template>
  <div class="">
    <!-- 容器 -->
    <div id="main"></div>
  </div>
</template>

<script>

// 导入echarts: 全部导入，包含echarts所有的工具包
import echarts from 'echarts';

export default {
  name: "",
  data() {
    return {
      options: {
        title: {
          text: "柱状图",
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption(this.options);
  },
};
</script>
<style scoped>
#main{
  /* width: 100%; */
  /* 容器高度必须设置，否则图表不显示 */
  height: 400px;
  margin: auto;
}
</style>
