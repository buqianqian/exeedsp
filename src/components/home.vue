<template>
  <div>
    <el-row>
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px;">
          <el-breadcrumb-item :to="{ path: '/home' }">瀑布流</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }" style="color: #529DFE">文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <!-- <el-row> -->
      <div>
        <!-- <el-col :xs="2"> -->
          <el-input v-model="keyWord" placeholder="标题" style="width: 200px"></el-input>
        <!-- </el-col> -->
        <!-- <el-col :xs="2"> -->
          <el-button type="primary" @click="searchTitle">搜索</el-button>
        <!-- </el-col> -->
        <!-- <el-col :xs="3"> -->
          <el-date-picker
            v-model="pickDate"
            type="date"
            @change="dateChange"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        <!-- </el-col> -->
        <el-button type="primary" style="float: right" @click="newArticle">新建文章</el-button>
      </div>
    <!-- </el-row> -->
    <div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top: 20px">
        <el-table-column
          label="ID"
          prop="article_id">
        </el-table-column>
        <el-table-column
          label="类别"
          prop="article_category">
        </el-table-column>
        <el-table-column
          label="文章标题"
          prop="article_title">
        </el-table-column>
        <el-table-column
          label="封面图"
          prop="article_img">
          <template slot-scope="scope">
            <img :src="scope.row.article_img" alt="" style="width: 120px;">
          </template>
        </el-table-column>
        <el-table-column
          label="文章链接"
          prop="article_curl">
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="article_time">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <!-- <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template> -->
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      pickDate: '',
      keyWord: '',
      currentPage: 1,
      tableData: [],
      search: '',
      total: 0
    }
  },
  methods: {
    newArticle () {
      this.$router.push('./new')
    },
    handleEdit (index, row) {
      this.$router.push({path: '/edit', query: row})
    },
    handleDelete (index, row) {
      this.$http.post('/del', {
        id: row.article_id
      }).then((res) => {
        console.log(res)
        if (res.data.status === 1) {
          console.log('删除成功')
          this.getList()
        } else if (res.data.status === 2) {
          console.log('操作失败')
        }
      })
    },
    async searchTitle () {
      console.log('搜索', this.keyWord)
      let data = `keyword=${this.keyWord}&page=1`
      const res = await this.$http.post('/search', data)
      const meta = res.data
      console.log(meta)
      if (meta.status === 1) {
        this.tableData = meta.data
        this.total = meta.data.length
        console.log(this.tableData)
      }
      // if (meta.status ===)
      // .then(function (res) {
      //   console.log(res)
      //   // console.log(res.data.data)
      //   if (res.status === 200) {
      //     console.log('true')
      //     this.tableData = res.data.data
      //     console.log(this.tableData)
      //   }
      // })
      // if (res.status === 200) {
      //   console.log('true')
      //   this.tableData = res.data.data
      //   console.log(this.tableData)
      // }
    },
    dateChange () {
      console.log('dateChange', this.pickDate)
      this.tableData = this.tableData.filter((val) => {
        return val.date === this.pickDate
      })
      this.keyWord = ''
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    async handleCurrentChange (val) {
      const res = await this.$http.post('/search', {
        page: val
      })
      const meta = res
      this.total = meta.data.count
      this.tableData = meta.data.data
      console.log(meta.data)
    },
    async getList () {
      const res = await this.$http.post('/search')
      const meta = res
      this.total = meta.data.count
      this.tableData = meta.data.data
      console.log(meta.data)
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>

</style>
