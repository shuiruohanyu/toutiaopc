<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src alt />
          {{'81期大神'}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>Git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  .el-dropdown-link {
    float: right;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #409eff;
    img {
      border-radius: 50%;
    }
  }
}
</style>
