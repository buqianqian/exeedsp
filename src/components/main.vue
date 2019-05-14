<template>
  <el-container>
    <el-header>EXEED</el-header>
    <el-container>
      <el-aside width="200px" height="100%">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              router
              default-active="./home"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <!-- <i class="el-icon-location"></i> -->
                  <span>瀑布流</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="./home">文章管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="./banner">banner</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-submenu .el-menu-item {
  min-width: 200px;
}
.el-header {
  padding: 0 50px;
  background-color: #555C64;
  color: #fff;
  border-bottom: 1px solid #fff;
  line-height: 60px
}
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: #555C64
  }
  li {
    width: 200px;
  }
}
</style>
