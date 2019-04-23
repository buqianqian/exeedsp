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
          prop="id">
        </el-table-column>
        <el-table-column
          label="类别"
          prop="category">
        </el-table-column>
        <el-table-column
          label="文章标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="封面图"
          prop="image">
        </el-table-column>
        <el-table-column
          label="文章链接"
          prop="link">
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="date">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      pickDate: '',
      keyWord: '',
      tableData: [{
        id: 1,
        category: 'Say YES合集',
        title: '111',
        image: '2121',
        link: 'www.baidu.com',
        date: '2016-05-02'
      },
      {
        id: 2,
        category: 'Say YES合集',
        title: '222',
        image: '1112',
        link: 'www.baidu.com',
        date: '2019-05-03'
      }],
      search: ''
    }
  },
  methods: {
    newArticle () {
      this.$router.push('./new')
    },
    handleEdit (index, row) {
      // console.log(index, row)
      this.$router.push({path: '/edit', query: row})
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    searchTitle () {
      console.log('搜索', this.keyWord)
    },
    dateChange () {
      console.log('dateChange', this.pickDate)
      this.tableData = this.tableData.filter((val) => {
        return val.date === this.pickDate
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
