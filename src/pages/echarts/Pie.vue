<template>
  <div class="">
      <v-chart :options="options" />
  </div>
</template>

<script>
// 导入vue-echarts
import ECharts from "vue-echarts";

// 导入饼状图的工具包
import "echarts/lib/chart/pie";
// 鼠标悬浮的提示工具
import "echarts/lib/component/tooltip";

export default {
  name: "",
  data() {
    return {
      options: {
        title: {
            text:'饼状图'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          top: 30,
          left: 10,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
          },
        ],
      },
    };
  },
  components: {
    // 注册组件
    'v-chart':ECharts
  },
};
</script>
<style scoped>
.echarts {
    width: 100%;
    height: 400px;
    margin: auto;
}
</style>
