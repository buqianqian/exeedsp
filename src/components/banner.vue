<template>
  <div>
    <el-row>
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;">
          <el-breadcrumb-item :to="{ path: '/home' }">瀑布流</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }" style="color: #529DFE">banner</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div style="padding: 20px; width:500px">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="封面图" prop="image">
          <el-upload
            multiple=""
            class="upload-demo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="change"
            :auto-upload='false'
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">确认发布</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- <form action="http://192.168.1.128/qirui/public/index.php/index/upload/uploadFile" method="post" id="form" enctype="multipart/form-data" ref="form">
        <input type="file" id="image" name="image"/>
      </form>
      <el-button type="primary" @click="submitForm('ruleForm')">确认发布</el-button>
      <el-button @click="cancel">取消</el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgurl: '',
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      ruleForm: {
        title: '',
        category: '',
        link: '',
        image: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$http.post('/uploadFile',
        'file = ' + this.imgurl
      ).then((res) => {
        console.log(res)
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    cancel () {
      this.$router.push('./home')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log('ss', file)
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
    }
  }
}
</script>

<style>

</style>
