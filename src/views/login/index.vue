<template>
  <div class="login">
    <el-card class="box-card">
      <img src="../../assets/logo_index.png" alt="黑马头条" />
      <el-form ref="form" :model="formData" :rules="rules" :status-icon="true">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formData.code" placeholder="请输入验证码" style="width:240px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :checked="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      // 登录方法
      // 要进行手机号和验证码的校验
      this.$refs.form.validate(isOk => {
        if (isOk) {
          // 如果一切校验通过 需要调用登录接口
          this.loginByUsername()
        }
      })
    },
    // 根据用户名及验证码登录
    // 如果数据不能清空
    loginByUsername () {
      this.$http
        .post('/authorizations', this.formData)
        .then(({ data: { token } }) => {
          window.localStorage.setItem('pc-token', token)
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          alert(err)
        })
    }
  },
  data () {
    // var phoneNum = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入手机号'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 定义数据
      formData: {
        mobile: '',
        code: ''
      },
      //  定义数据规则 给elementUI的表单使用
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            len: 11,
            message: '手机长度必须为11个字符',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            len: 6,
            message: '验证码长度必须为6个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/login_bg.jpg");
  width: 100%;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 400px;
    height: 330px;
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
