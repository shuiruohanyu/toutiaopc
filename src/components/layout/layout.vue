<template>
  <el-container style="height:100vh">
    <el-aside width="200px" class="slide">
      <layout-slider></layout-slider>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutSlider from './layout-slider.vue'
import layoutHeader from './layout-header.vue'
export default {
  name: 'layoutSlider',
  components: {
    'layout-slider': layoutSlider,
    'layout-header': layoutHeader
  }
}
</script>

<style lang='less' >
.main {
  padding: 0 !important;
  background-color: #e7e7e9;
}
</style>
