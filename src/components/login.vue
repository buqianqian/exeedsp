<template>
  <div class="login">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码" class="verify" style="maigin-top: 20px">
        <div style="width: 200px; height: 100%; position:relative">
          <img :src="imgUrl" alt="" @click="refresh" style="width: 200px;height: 30px;position: absolute;top:0px;left:0;">
        </div>
      </el-form-item>
      <el-form-item label="输入验证码" prop="verifycode">
        <el-input v-model="form.verifycode" placeholder="请输入验证码" @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    var verifycode = (rule, value, callback) => {
      if (value.length !== 5) {
        callback(new Error('验证码错误'))
      } else if (value.length === 5) {
        callback()
        // let verifyresult = this.verify()
        // if (verifyresult.status === 1) {
        //   callback()
        // } else {
        //   callback(new Error('验证码错误'))
        // }
      }
      // callback()
    }
    return {
      // user: '',
      verifycode: '',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' }
        ],
        password: [
          { message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ],
        verifycode: [
          { validator: verifycode, trigger: 'blur' }
        ]
      },
      imgUrl: 'http://192.168.1.128/qirui/public/index.php/index/login/code'
    }
  },
  methods: {
    login (form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post('/login', {
            username: this.form.username,
            password: this.form.password
          }).then((res) => {
            console.log(res)
            if (res.data.status === 1) {
              localStorage.setItem('user', 111)
              this.$router.push('./home')
            }
          })
        } else {
          this.$message.error('用户名或密码错误')
          return false
        }
      })
    },
    verify () {
      this.$http.post('/check_verify', {
        code: this.form.verifycode
      }).then((res) => {
        return res
      })
    },
    reset () {
      this.$refs.form.resetFields()
    },
    refresh () {
      let url = this.imgUrl
      this.imgUrl = ''
      setTimeout(() => {
        this.imgUrl = url
      }, 200)
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #555C64;
  overflow: hidden;

  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 200px auto;
    padding: 75px 40px 15px 40px;
    border-radius: 20px;
    position: relative;

    img {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .el-button ~ .el-button {
      margin-left: 80px;
    }
    .verify {
      display: flex
    }
  }

}
</style>
