<template>
    <el-container class="home-container">

        <el-header>
            <div>
                <span @click = "handle" >教务管理系统</span>
            </div>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">{{name}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toResetpw">修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-button type="info" @click="logout">退出</el-button> -->
        </el-header>

        <el-container>
        <el-aside :width="isCollapse ? '61px' : '200px'">
          <div class="toggle-button" @click="toggleCollpase">|||</div>
            <el-menu :router="true" :default-active="activePath" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false">
                <el-submenu :index="item.id + ''" v-for="item in submenulist" :key="item.id">
                    <template slot="title">
                    <i :class="iconsObj[item.id]"></i>
                    <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item :index="'/' + sunItem.path" v-for="sunItem in item.children" :key="sunItem.id" @click="saveActivePath('/' + sunItem.path)">
                        <template slot="title">
                        <span>{{ sunItem.authName }}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item :index="'/' + item.path" v-for="item in menulist" :key="item.id" @click="saveActivePath('/' + item.path)">
                    <i :class="iconsObj[item.id]"></i>
                    <span slot="title">{{item.authName}}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      name: ' ',
      submenulist: [],
      menulist: [],
      iconsObj: {
        11: 'el-icon-user-solid',
        12: 'el-icon-collection',
        13: 'el-icon-reading',
        205: 'el-icon-office-building',
        14: 'el-icon-school',
        15: 'el-icon-unlock'
      },
      isCollapse: false,
      activePath: '',
      userAdmin: {
        authName: '用户管理',
        id: 11,
        order: 1,
        path: '/user',
        children: [
          {
            authName: '教师管理',
            id: 111,
            path: 'teacher',
            children: []
          },
          {
            authName: '学生管理',
            id: 112,
            path: 'student',
            children: []
          }
        ]
      },
      userTea: {
        authName: '用户管理',
        id: 11,
        path: '/user',
        children: [
          {
            authName: '学生管理',
            id: 112,
            path: 'student',
            children: []
          }
        ]
      },
      courseAd: {
        authName: '课程课表',
        id: 12,
        path: '/course',
        children: [
          {
            authName: '课程管理',
            id: 121,
            path: 'courseAd',
            children: []
          },
          {
            authName: '课表管理',
            id: 122,
            path: 'courseTableAd',
            children: []
          }
        ]
      },
      courseTea: {
        authName: '课程课表',
        id: 12,
        path: '/course',
        children: [
          {
            authName: '课程管理',
            id: 121,
            path: 'courseTea',
            children: []
          },
          {
            authName: '课表管理',
            id: 122,
            path: 'courseTableTea',
            children: []
          }
        ]
      },
      courseStu: {
        authName: '课表查询',
        id: 12,
        path: 'courseTableStu'
      },
      scoreAd: {
        authName: '成绩管理',
        id: 13,
        path: 'scoreAd'
      },
      scoreTea: {
        authName: '成绩管理',
        id: 13,
        path: 'scoreTea'
      },
      scoreStu: {
        authName: '成绩查询',
        id: 13,
        path: 'scoreStu'
      },
      employmentAd: {
        authName: '就业管理',
        id: 205,
        path: 'employmentAd'
      },
      employmentStu: {
        authName: '就业管理',
        id: 205,
        path: 'employmentStu'
      },
      graduateAd: {
        authName: '毕业管理',
        id: 14,
        path: 'graduateAd'
      },
      graduateStu: {
        authName: '毕业查询',
        id: 14,
        path: 'graduateStu'
      },
      resetPasswd: {
        authName: '重置密码',
        id: 15,
        path: 'resetPasswd'
      },
      role: ''
    }
  },
  created () {
    this.getMenuList()
    this.getName()
  },
  methods: {
    handle () {
      this.$router.push('/home')
    },
    async logout () {
      const { data: res } = await this.$http.post('user/logout')
      if (res.code === 20052) {
        this.$message.success(res.msg)
        window.sessionStorage.clear()
        this.$router.push('/login')
      } else {
        this.$message.error('未知错误')
        window.sessionStorage.clear()
        this.$router.push('/login')
      }
    },
    toResetpw () {
      this.$router.push('/updatepasswd')
    },
    getMenuList () {
      this.role = window.sessionStorage.getItem('role')
      switch (this.role) {
        case '1':
          this.submenulist[0] = this.userAdmin
          this.submenulist[1] = this.courseAd
          this.menulist[0] = this.scoreAd
          this.menulist[1] = this.graduateAd
          this.menulist[2] = this.employmentAd
          this.menulist[3] = this.resetPasswd
          break
        case '2':
          this.submenulist[0] = this.userTea
          this.submenulist[1] = this.courseTea
          this.menulist[0] = this.scoreTea
          break
        case '3':
          this.menulist[0] = this.courseStu
          this.menulist[1] = this.scoreStu
          this.menulist[2] = this.graduateStu
          this.menulist[3] = this.employmentStu
          break
      }
    },
    async getName () {
      const userid = window.sessionStorage.getItem('userid')
      if (this.role === '1') {
        this.name = '管理员'
      }
      if (this.role === '2') {
        const { data: res } = await this.$http.get('teacher/user/info/' + userid)
        this.name = res.data.name
      }
      if (this.role === '3') {
        const { data: res } = await this.$http.get('student/user/info/' + userid)
        this.name = res.data.name
      }
    },
    toggleCollpase() {
      this.isCollapse = !this.isCollapse
    },
    saveActivePath (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      // console.log(this.$route.path)
    }

  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header{
    span{
      cursor: pointer;
    }
    background-color: #1a8890;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
}

.el-aside {
    background-color: #fdfdfe;
}

.el-main {
    background-color: #dce4e8;
}
.el-dropdown-link {
    cursor: pointer;
    color: #000000;
    font-size: 18px;
    margin-right: 20px;
}
.toggle-button {
  background: #fdfdfe;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
