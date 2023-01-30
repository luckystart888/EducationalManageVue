<template>
    <div class="Update">
    <Breadcrumb name1="修改密码"/>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
        <div class="Update_box">
            <p>修改密码</p>
            <el-form label-width="80px" ref="updateFormRef" :model="updatePwdForm" :rules="updatePwdFormRules">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input v-model="updatePwdForm.oldPwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="updatePwdForm.newPwd"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="newPwd2">
                    <el-input v-model="updatePwdForm.newPwd2"></el-input>
                </el-form-item>
                <el-form-item id="btns">
                    <el-button type="primary" @click="updatePassWord">提交</el-button>
                    <el-button @click="resetupdatePwdForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
    </div>
</template>

<script>
import Breadcrumb from './content/breadcrumb/Breadcrumb.vue'
import { updatePwdFormRulesMixin } from '@/common/mixin.js'
export default {
  mixins: [updatePwdFormRulesMixin],
  data () {
    return {
      updatePwdForm: {
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      }
    }
  },
  methods: {
    updatePassWord () {
      this.$refs.updateFormRef.validate(async valid => {
        if (!valid) return
        const pwd = {
          oldPwd: this.updatePwdForm.oldPwd,
          newPwd: this.updatePwdForm.newPwd
        }
        const { data: res } = await this.$http.post('user/updatePwd', this.$qs.stringify(pwd))
        if (res.code === 20031) {
          this.$message.success(res.msg)
          window.sessionStorage.clear()
          this.$router.push('/login')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetupdatePwdForm () {
      this.$refs.updateForRef.resetFields()
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
.Update_box {
    width: 30%;
    height: 100%;
    transform: translate(100%,0%);
    p {
         font-weight: bold;
         font-size: large;
         transform: translate(46%,0%);
      }
    #btns{
        transform: translate(20%,0%);
    }
}
</style>
