<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="userInfo.photo" alt />
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" :hide-on-click="false">
          <router-link to="/home/account">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <a href="https://github.com/shuiruohanyu/toutiaopc">
            <el-dropdown-item>Git地址</el-dropdown-item>
          </a>
          <el-dropdown-item>
            <span style="display:block;" @click="lgout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // 从vuex中获取用户信息
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    // 登出方法
    lgout () {
      window.localStorage.clear()
      this.$router.push('/login')
    },
    loadUser () {
      this.$http({
        method: 'get',
        url: '/user/profile'
      }).then(result => {
        this.$store.commit('updateUserInfo', result.data) // 更新用户数据
      })
    }
  },
  created () {
    this.loadUser()
  }
}
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
      width: 30px;
      height: 30px;
      margin-right: 20px;
    }
  }
}
</style>
