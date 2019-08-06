<template>
  <el-card>
    <span slot="header">粉丝画像</span>
    <el-row>
      <el-col :span="4">
        <el-radio-group size="small" v-model="selectType">
          <el-radio-button label="today">今日</el-radio-button>
          <el-radio-button label="week">本周</el-radio-button>
          <el-radio-button label="month">本月</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="6">
        <el-date-picker type="datetimerange"></el-date-picker>
      </el-col>
    </el-row>
    <el-row style="margin:60px 0">
      <el-col class="block" :span="6" :offset="1">
        <span class="point"></span>
        <div class="info">
          <span>30个</span>
          <span>粉丝数</span>
        </div>
      </el-col>
      <el-col class="block" :span="6" :offset="1">
        <span class="point"></span>
        <div class="info">
          <span>22%</span>
          <span>粉丝累计阅读量</span>
        </div>
      </el-col>
      <el-col class="block" :span="6" :offset="1">
        <span class="point"></span>
        <div class="info">
          <span>1.2元</span>
          <span>粉丝收益</span>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:60px 0">
      <div ref="myLineEChart" style="width:100%;height:400px"></div>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="2">
        <div ref="pieChart1" style="width:100%;height:300px"></div>
      </el-col>
      <el-col :span="8" :offset="2">
        <div ref="pieChart2" style="width:100%;height:300px"></div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      selectType: 'today',
      lineOptions: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      },
      pieOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      },
      linChart: null
    }
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.linChart = echarts.init(this.$refs.myLineEChart) // 初始化实例
    this.linChart.setOption(this.lineOptions)
    this.pieChart1 = echarts.init(this.$refs.pieChart1) // 饼图1
    this.pieChart2 = echarts.init(this.$refs.pieChart2) // 饼图2
    this.pieChart1.setOption(this.pieOptions)
    this.pieChart2.setOption(this.pieOptions)
  }
}
</script>

<style lang="less" scoped>
.block {
  background-color: #f8f8f8;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  .point {
    background-color: red;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: inline-block;
  }
  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      font-size: 14px;
    }
    span:nth-child(1) {
      font-size: 25px;
    }
  }
}
</style>
