<template>
  <el-card class="account">
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled :value="userInfo.id && userInfo.id.toString()"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdate">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :span="4">
        <!--
          el-upload 上传组件，它会自动将用户选择的图片去请求上传，我们要做的就是配置一下
           action 请求地址
           由于它用的自己内部的请求，不是使用的 axios 去发请求
              完整路径
              它的请求也不会经过 axios 拦截器，所以需要手动配置 token
           可惜的是它不支持自定义请求方法，前功尽弃
        -->
        <!-- <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :headers="{ Authorization: token }"
          name="photo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img class="avatar" v-if="userInfo.photo" :src="userInfo.photo">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
        <el-upload action="" class="avatar-uploader" :show-file-list="false" :http-request="handleUpload">
          <img class="avatar" v-if="userInfo.photo" :src="userInfo.photo" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    //   保存更新
    handleUpdate () {
      this.$http({
        method: 'patch',
        url: '/user/profile',
        data: this.userInfo
      }).then(result => {
        this.$message({ type: 'success', message: '修改成功' })
        this.$store.commit('updateUserInfo', this.userInfo)
      })
    },
    handleUpload (uploadConfig) {
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then(result => {
        this.userInfo.photo = result.data.photo
        this.$store.commit('updateUserInfo', this.userInfo)
      })
    }
  },
  created () {
    //   拉取用户信息数据
    this.$http({
      method: 'get',
      url: '/user/profile'
    }).then(result => {
      this.userInfo = result.data
    })
  }
}
</script>

<style lang='less' scoped>
.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}
</style>
