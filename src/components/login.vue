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
import qs from 'qs'
export default {
  data () {
    var verifycode = (rule, value, callback) => {
      if (value.length !== 5) {
        callback(new Error('验证码错误'))
      } else if (value.length === 5) {
        // callback()
        this.verify()
        if (this.verifyresult.data.status === 2) {
          console.log(1111)
          callback()
        } else {
          callback(new Error('验证码错误'))
          console.log('不通过')
        }
        //
        // console.log(this.verify())
        // let verifyresult = this.verify()
        // console.log(this.verify())
        // if (verifyresult.status === 1) {
        //   callback()
        // } else {
        //   callback(new Error('验证码错误'))
        // }
      }
    }
    return {
      user: '',
      verifyresult: '',
      verifycode: '',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ],
        verifycode: [
          { validator: verifycode, required: true, trigger: 'blur' }
          // { min: 5, max: 5, message: '长度5个字符', trigger: 'change' }
        ]
      },
      imgUrl: 'http://192.168.1.128/qirui/public/index.php/index/login/code'
    }
  },
  methods: {
    login (form) {
      if (this.verifyresult.data.status === 2) {
        console.log('验证通过login')
        this.$refs.form.validate((valid) => {
          if (valid) {
            let data = qs.stringify({
              username: this.form.username,
              password: this.form.password
            })
            this.$http.post('/login', data).then((res) => {
              this.user = res.data.name
              if (res.data.status === 1) {
                localStorage.setItem('user', this.user)
                this.$router.push('./home')
                this.$message.success('登录成功')
              } else {
                this.$message.error('登录失败')
              }
            })
          } else {
            this.$message.error('登录失败')
            return false
          }
        })
      }
    },
    verify () {
      this.$http.post('/check_verify', `code=${this.form.verifycode}`).then((res) => {
        // return res
        // console.log(res)
        this.verifyresult = res
        // console.log(this.verifyresult)
        // if (this.verifyresult.data.status === 2) {
        //   console.log('通过')
        // }
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
