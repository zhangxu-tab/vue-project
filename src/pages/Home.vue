<template>
  <div class="home">
    <el-card>
      <!-- 柱状图 -->
      <v-chart :options="barOptions"></v-chart>
      <!-- 饼状图 -->
      <v-chart :options="pieOptions"></v-chart>
    </el-card>
    <el-card>
      <!-- 折线图 -->
      <v-chart :options="lineOptions"></v-chart>
    </el-card>
  </div>
</template>

<script>
// 导入vue-echarts
import vueEcharts from "vue-echarts";
// 按需导入绘制对应图表的工具包
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
// 导入提示工具包tooltip
import "echarts/lib/component/tooltip";
import 'echarts/lib/component/toolbox';

export default {
  name: "home",
  data() {
    return {
      // 销售业绩
      saleDate: [],
      // x轴
      xData: [],
      // y轴
      yData: [],
      // 柱状图的配置对象
      barOptions: {
        title: {
          text: "月度销售业绩柱状图",
        },
        tooltip: {},
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {},
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar"  //指定图表的形状
          },
        ],
      },
      // 饼状图的配置对象
      pieOptions: {
        title: {
          text: "月度销售业绩饼状图",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {}
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          top: 30,
          left: 10,
          // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
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
            // data: [
            //   { value: 335, name: "直接访问" },
            //   { value: 310, name: "邮件营销" },
            //   { value: 234, name: "联盟广告" },
            //   { value: 135, name: "视频广告" },
            //   { value: 1548, name: "搜索引擎" },
            // ],
          },
        ],
      },
      // 折线图的配置对象
      lineOptions: {
        title: {
            text:'月度销售业绩折线图'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {}
          },
        },
        legend: {},
        tooltip: {},
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "line",
            areaStyle: {}
          },
        ],
      },
    };
  },
  components: {
    "v-chart": vueEcharts,
  },
  created() {
    this.queryData();
  },
  mounted() {},
  methods: {
    async queryData() {
      const res = await this.$http.get("/api/charts");
      if (res.code == 200) {
        this.saleDate = res.list;
        this.saleDate.forEach(item => {
          // x轴
          this.xData.push(item.month + "月");
          // y轴
          this.yData.push(item.total);
        });
        // 更新this.barOptions
        this.barOptions = Object.assign(this.barOptions,{
          xAxis: { data: this.xData },
          series: { data: this.yData }
        });
        // 更新this.lineOptions
        this.lineOptions = Object.assign(this.lineOptions,{
          xAxis: { data: this.xData },
          series: { data: this.yData }
        })
        // 更新this.pieOptions
        this.zData = this.yData.map((value,i,name) => (
          {value,name:this.xData[i]}
        )) 
        this.pieOptions = Object.assign(this.pieOptions,{
          legend:{data:this.xData},
          series:{data:this.zData}
        })
      }
    },
  },
};
</script>
<style scoped>
.echarts {
  float: left;
  height: 400px;
}
</style>
