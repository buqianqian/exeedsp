<template>
  <div id="app">
    <!-- <router-view/> -->
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px" height="100%">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
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
                    <el-menu-item index="1-1">文章管理</el-menu-item>
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
  </div>
</template>

<script>
export default {
  name: 'App',
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
html,body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 200px;
}
.el-header {
  padding: 0;
  background-color: #555C64;
  color: #fff;
  border-bottom: 1px solid #fff;
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
