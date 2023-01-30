<template>
   <div class="login_container">
      <img src="../assets/index.jpg"/>
      <div class="login_box">
         <div class="avatar_box">
            <p>教务管理系统</p>
         </div>
         <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" @keyup.enter.native="login">
            <!-- 用户名 -->
            <el-form-item prop="username">
               <el-input v-model.number="loginForm.username" :maxlength="10" placeholder="请输入学号/工号" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
               <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" type="password"></el-input>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item class="btns">
               <el-button type="primary" round @click="login">登录</el-button>
               <el-button type="info" round @click="resetLoginForm">重置</el-button>
            </el-form-item>
         </el-form>
      </div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '学号/工号不能为空', trigger: 'blur' },
          { type: 'number', message: '学号/工号为数字' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      role: ''
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('user/login', this.$qs.stringify(this.loginForm))
        if (res.code === 20051) {
          this.$message.success(res.msg)
          window.sessionStorage.setItem('role', res.data.role)
          window.sessionStorage.setItem('userid', res.data.userid)
          this.$router.push('/home')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
   background-color: #2b4b6b;
   height: 100%;
   img {
      width: 100%;
      height: 100%;
   }
}
.login_box{
   width: 450px;
   height: 300px;
   background-color: #fff;
   border-radius: 3px;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);

   .avatar_box{
      width: 110px;
      height: 110x;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-220%);
      p {
         font-weight: bold;
         font-size: large;
      }
   }
}
.login_form{
   position: absolute;
   bottom: 0;
   width: 100%;
   padding: 0 50px;
   box-sizing: border-box;
}
.btns{
   transform: translate(30%,0%);
}
</style>
