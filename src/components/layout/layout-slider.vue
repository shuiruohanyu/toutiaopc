<template>
  <div class="layout-slider">
    <div class="logo">
      <img src="../../assets/logo_admin.png" alt />
    </div>
    <el-menu
      router
      class="sidebar-el-menu"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu>
        <template slot="title">
          <span>内容管理</span>
        </template>
        <template>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材列表</el-menu-item>
        </template>
      </el-submenu>
      <el-submenu index="fans">
        <template slot="title">
          <span>粉丝管理</span>
        </template>
        <template>
          <el-menu-item index="twlist">图文数据</el-menu-item>
          <el-menu-item index="fansinfo">粉丝概况</el-menu-item>
          <el-menu-item index="fansnew">粉丝画像</el-menu-item>
          <el-menu-item index="fanslist">粉丝列表</el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item index="account">账户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-slider {
  background-color: #2e2f32;
  width: 100%;
  height: 100%;
  .logo {
    padding: 15px;
    img {
      width: 120px;
    }
  }
  .sidebar-el-menu {
    border: none;
    height: auto;
    width: 100% !important;
    text-align: left;
    .is-active > .el-submenu__title {
      color: #ffffff !important;
    }
  }
}
</style>
