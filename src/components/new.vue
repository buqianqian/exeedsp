<template>
  <div>
    <el-row>
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;">
          <el-breadcrumb-item :to="{ path: '/' }">瀑布流</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home' }" style="color: #529DFE">文章管理</el-breadcrumb-item>
          <el-breadcrumb-item style="color: #529DFE">新建文章</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div style="padding: 20px; width:500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="article_title">
          <el-input v-model="ruleForm.article_title"></el-input>
        </el-form-item>
        <el-form-item label="门店品类" prop="article_category">
          <el-radio-group v-model="ruleForm.article_category">
            <el-radio label="1">Say YES合集</el-radio>
            <el-radio label="2">新闻中心</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章链接" prop="article_curl">
          <el-input v-model="ruleForm.article_curl"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="article_img">
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="change"
            :auto-upload='false'
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
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
import qs from 'qs'
export default {
  data () {
    return {
      imgurl: '',
      ruleForm: {
        article_title: '',
        article_category: '',
        article_curl: '',
        article_img: ''
      },
      rules: {
        article_title: [
          { required: true, message: '请输入文章标题', trigger: 'change' }
        ],
        article_category: [
          { required: true, message: '请选择门店品类', trigger: 'change' }
        ],
        article_curl: [
          { required: true, message: '请输入文章链接', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    uploadImg (res, file) {
      console.log(1)
      if (res.status === 1) {
        this.foodForm.image_path = res.image_path
      } else {
        this.$message.error('上传图片失败！')
      }
    },
    beforeImgUpload (file) {
      console.log(2)
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    submitForm (ruleForm) {
      // var time = new Date()
      // console.log(time.getTime())
      this.$refs.ruleForm.validate((valid) => {
        let data = qs.stringify({
          article_title: this.ruleForm.article_title,
          article_curl: this.ruleForm.article_curl,
          article_img: this.ruleForm.article_img,
          article_category: this.ruleForm.article_category
        })
        if (valid) {
          this.$http.post('/add', data).then((res) => {
            console.log(res.data)
            if (res.data.status === 1) {
              this.$message.success('文章上传成功')
              this.$router.push('./home')
            } else {
              this.$message.error('文章上传失败')
            }
          })
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      this.$router.push('./home')
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
      let data = qs.stringify({
        file: this.imgurl,
        type: 'article'
      })
      this.$http.post('/uploadFile', data).then((res) => {
        console.log(res)
        if (res.data.status === 1) {
          this.$message.success('图片上传成功')
          this.ruleForm.article_img = res.data.path
          return false
        } else {
          this.$message.error('图片上传失败')
        }
        // console.log(this.article_img)
      })
    }
  }
}
</script>

<style>

</style>
