<template>
    <div class="Update">
    <Breadcrumb name1="就业管理"/>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
        <div class="Update_box">
            <p>就业信息提交</p>
            <el-form label-width="80px" ref="employmentFormRef" :model="employmentForm" :rules="employmentFormRules">
                <el-form-item label="学号" prop="studentid">
                    <el-input v-model="employmentForm.studentid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学生姓名" prop="name">
                    <el-input v-model="employmentForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="classname">
                    <el-input v-model="employmentForm.classname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="工作省份" prop="workprovince">
                    <el-input v-model="employmentForm.workprovince"></el-input>
                </el-form-item>
                <el-form-item label="工作单位" prop="workunit">
                    <el-input v-model="employmentForm.workunit"></el-input>
                </el-form-item>
                <el-form-item label="月工资" prop="wages">
                    <el-input v-model="employmentForm.wages"></el-input>
                </el-form-item>
                <el-form-item id="btns">
                    <el-button type="primary" @click="submitEmployment">提交</el-button>
                    <el-button @click="resetEmploymentForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
    </div>
</template>

<script>
import { employmentFormRulesMixin } from '@/common/mixin.js'
import Breadcrumb from '../content/breadcrumb/Breadcrumb.vue'
export default {
  mixins: [employmentFormRulesMixin],
  data () {
    return {
      employmentForm: {}
    }
  },
  methods: {
    async getEmployment () {
      const { data: res } = await this.$http.get('student/employment')
      this.employmentForm = res.data
    },
    submitEmployment () {
      this.$refs.employmentFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('student/employment', this.employmentForm)
        if (res.code === 20031) {
          this.$message.success(res.msg)
          this.getEmployment()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetEmploymentForm () {
      this.employmentForm.workprovince = ''
      this.employmentForm.workunit = ''
      this.employmentForm.wages = ''
    }
  },
  components: {
    Breadcrumb
  },
  created () {
    this.getEmployment()
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
