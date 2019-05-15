<template>
  <div>
    <el-row>
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;">
          <el-breadcrumb-item :to="{ path: '/' }">瀑布流</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home' }" style="color: #529DFE">轮播图管理</el-breadcrumb-item>
          <el-breadcrumb-item style="color: #529DFE">{{this.ruleForm.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div style="padding: 20px; width:500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="序号" prop="banner_level">
          <el-input v-model="ruleForm.banner_level"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="banner_link">
          <el-input v-model="ruleForm.banner_link"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="banner_url">
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="change"
            :auto-upload='false'
            :file-list="fileList"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">重新上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <el-button size="small" type="primary" @click="confirm">确认上传</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认发布</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [{
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      imgurl: '',
      ruleForm: {
        banner_id: '',
        banner_level: '',
        banner_link: '',
        banner_url: ''
      },
      rules: {
        banner_level: [
          { required: true, message: '请输入图片序号', trigger: 'change' }
        ],
        banner_link: [
          { required: true, message: '请选择图片链接', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (ruleForm) {
      // var time = new Date()
      // console.log(time.getTime())
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http.post('/add', {
            banner_id: this.ruleForm.banner_id,
            banner_level: this.ruleForm.banner_level,
            banner_link: this.ruleForm.banner_link,
            banner_url: this.ruleForm.banner_url
          }).then((res) => {
            console.log(res.data)
            if (res.data.status === 1) {
              this.$message.success('图片上传成功')
              this.$router.push('./banner')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      this.$router.push('./banner')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    beforeAvatarUpload () {
      console.log(1111)
    },
    change (file) {
      console.log(file)
      function getImageBlob (url, cb) {
        const xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.responseType = 'blob'
        xhr.onload = function () {
          if (this.status === 200) {
            if (cb) cb(this.response)
          }
        }
        xhr.send()
      }
      if (file.size < 1100000) {
        let reader = new FileReader()
        getImageBlob(file.url, function (blob) {
          reader.readAsDataURL(blob)
        })
        reader.onload = e => {
          this.imgurl = e.target.result
          console.log(e.target.result) // base64
          console.log('this.imgurl', this.imgurl)
        }
      } else {
        alert('文件太大')
      }
    },
    confirm () {
      this.$http.post('/uploadFile', 'file=' + this.imgurl).then((res) => {
        this.article_img = res.article_img
      })
    }
  },
  created () {
    this.ruleForm = this.$route.query
    console.log(this.ruleForm)
    this.fileList[0].name = this.$route.query.article_img
    this.fileList[0].url = this.$route.query.article_img
  }
}
</script>

<style>

</style>
