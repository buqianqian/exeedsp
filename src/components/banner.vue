<template>
  <div>
    <el-row>
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;">
          <el-breadcrumb-item :to="{ path: '/home' }">瀑布流</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }" style="color: #529DFE">轮播图管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div>
      <el-button type="primary" style="float: right" @click="newBanner">新建轮播图</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top: 20px">
        <el-table-column
          label="序号"
          prop="banner_level">
        </el-table-column>
        <el-table-column
          label="图片"
          prop="banner_url">
          <template slot-scope="scope">
            <img :src="scope.row.banner_url" alt="" style="width: 120px;">
          </template>
        </el-table-column>
        <el-table-column
          label="链接"
          prop="banner_link">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top: 50px;float: right;margin-right: 30px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- <div style="padding: 20px; width:500px">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="封面图" prop="image">
          <el-upload
            multiple=""
            action=""
            class="upload-demo"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="change"
            :auto-upload='false'
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">确认发布</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div> -->
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      currentPage: 1,
      total: 0,
      imgurl: '',
      tableData: [],
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
      // let data = qs.stringfy({
      //   file: this.imgurl
      // })
      this.$http.post('/uploadFile', 'file=' + this.imgurl).then((res) => {
        console.log('methods:' + res)
      })
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
          console.log('base64:' + e.target.result) // base64
          // console.log('this.imgurl', this.imgurl)
        }
      } else {
        alert('文件太大')
      }
    },
    getBanner () {
      this.$http.post('/bannerList', qs.stringify({page: 1})).then((res) => {
        this.tableData = res.data.data
        console.log(res.data)
        this.total = res.data.count
        // this.tableData = res.data.data
      })
    },
    handleDelete (index, row) {
      console.log('del', index, row)
      this.$http({
        method: 'POST',
        url: '/bannerdel',
        // url: 'http://192.168.1.128/qirui/public/index.php/index/upload/del',
        data: qs.stringify({id: row.banner_id})
      })
        .then(res => {
          // this.$http.post('/bannerdel', qs.stringify({id: row.banner_id})).then((res) => {
          console.warn(res)
          if (res.data.status === 1) {
            console.log('删除成功')
            this.$message.success('删除成功')
            this.getBanner()
            return false
          } else if (res.data.status === 2) {
            console.log('删除失败')
          }
        })
    },
    handleEdit (index, row) {
      this.$router.push({path: '/editBanner', query: row})
    },
    newBanner () {
      this.$router.push('/newbanner')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    async handleCurrentChange (val) {
      const res = await this.$http.post('/bannerList', 'page=' + val)
      const meta = res
      console.log(meta)
      this.total = meta.data.count
      this.tableData = meta.data.data
      console.log(meta.data)
    }
  },
  created () {
    this.getBanner()
  }
}
</script>

<style>

</style>
