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
            <el-radio label="Say YES合集"></el-radio>
            <el-radio label="新闻中心"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章链接" prop="article_curl">
          <el-input v-model="ruleForm.article_curl"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="article_img">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            :limit="1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
      fileList2: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      ruleForm: {
        article_title: '',
        article_category: '',
        article_curl: '',
        article_img: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择门店品类', trigger: 'change' }
        ],
        link: [
          { required: true, message: '请输入文章链接', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传图片', trigger: 'blur' }
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
    }
  }
}
</script>

<style>

</style>
