<template>
  <el-container style='height:100vh' >
    <el-aside width="200px" class='slide'>
      <layout-slider></layout-slider>
    </el-aside>
    <el-container>
      <el-header>头部</el-header>
      <el-main>
        <rouer-view></rouer-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutSlider from './layout-slider.vue'
export default {
  name: 'layoutSlider',
  components: {
    'layout-slider': layoutSlider
  }
}
</script>

<style>

</style>
