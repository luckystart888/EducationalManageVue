<template>
    <div class="Reset">
    <Breadcrumb name1="重置密码"/>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
        <el-row :gutter="20">
                <el-col :span="16">
                    <el-form :inline="true" ref="RestFormRef" :model="formRest" :rules="RestFormRules">
                        <el-form-item label="工号/学号:" prop="userid">
                            <el-input v-model.number="formRest.userid" :maxlength="10" placeholder="工号/学号" style="width: 160px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getUser">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4">
                    <!-- 添加用户区域 -->
                    <el-button type="primary" @click="resetPasswd">重置密码</el-button>
                </el-col>
            </el-row>
        <div class="Reset_box">
            <el-descriptions class="margin-top" title="用户信息" :column="1" border>
                <el-descriptions-item>
                <template slot="label">
                    工号/学号
                </template>
                {{UserVO.userid}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    姓名
                </template>
                {{UserVO.name}}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </el-card>
    </div>
</template>

<script>
import Breadcrumb from './content/breadcrumb/Breadcrumb.vue'
export default {
  data () {
    return {
      formRest: {},
      User: {},
      UserVO: {},
      RestFormRules: {
        userid: [
          { required: true, message: '学号/工号不能为空', trigger: 'blur' },
          { type: 'number', message: '学号/工号为数字' }
        ]
      }
    }
  },
  methods: {
    getUser () {
      this.$refs.RestFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.get('admin/user/' + this.formRest.userid)
        this.User = res.data
        this.getUserVO()
        if(this.User.role === 1){
          this.UserVO = {userid: this.User.userid, name: "管理员"}
        }
        if (res.code === 20041) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
          this.UserVO = {}
        }
        this.formRest = {}
      })
    },
    async resetPasswd () {
      const { data: res } = await this.$http.put('admin/user/resetpassword', this.User)
      if (res.code === 20031) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    async getUserVO () {
      const { data: res } = await this.$http.get('admin/user/userVO/' + this.formRest.userid)
      if (res.data !== null) this.UserVO = res.data
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
