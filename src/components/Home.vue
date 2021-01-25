<template>
  <div class="home-div">
    <el-container>
      <!--      头部区域-->
      <el-header>
        <div>
          <img src="../assets/logo.png">
          <span>商城管理系统</span>
        </div>
        <el-button @click="logout" type="info">退出</el-button>
      </el-header>
      <el-container>
        <!--        侧边区域-->
        <el-aside :width="isCollaose ? '64px' : '200px'">
          <div @click="toggleCollapse" class="toggle-button">
            <i :class="isCollaose ? 'fas fa-outdent' : 'fas fa-indent'"></i>
          </div>
          <el-menu
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409BEF" :unique-opened="true" :collapse="isCollaose" :collapse-transition="false"
              :router="true" :default-active="$route.path">
            <el-submenu v-for="item in menulist" :key="item.id" :index="item.id+''">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="'/'+subItem.path">
                <i :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--        主体区域-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menulist: [],//侧边栏菜单数据
      isCollaose:false, //是否折叠菜单

    }
  },
  created() {
    this.getMenuList()
    // console.log(this)
  },
  methods: {
    logout() {
      // 注销
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getMenuList() {
      // 获取侧边菜单
      this.$http.get('menus').then(response => {
        console.log(response);//请求正确时执行的代码
        let result = response.data
        if (result.status == 200) {
          // this.$message.success(result.message)
          this.menulist = result.menu
          // console.log(this.menulist)
        } else {
          this.$message.error('获取菜单数据异常！')
        }
      }).catch(response => {
        //发生错误时执行的代码
        this.$message.warning('服务器错误！')
        console.log(response)
      });
    },
    toggleCollapse(){
      // 点击按钮切换菜单的折叠与展开
      this.isCollaose = !this.isCollaose
    }
  }
}
</script>

<style lang="less" scoped>
.home-div, .el-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;

  div {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
    }

    span {
      margin-left: 10px;
    }
  }
}

.el-aside {
  transition: all 1s;
  background-color: #333744;
  .toggle-button > i {
    font-size: 30px;
    color: deepskyblue;
    line-height: 40px;
    display: block;
    text-align: center;
    cursor: pointer;
  }
  i {
    color: #fff;
    padding-right: 5px;
  }
  .el-menu{
    border-right: none;
  }
}

.el-main {
  background-color: #EAEDF1;
}
</style>
