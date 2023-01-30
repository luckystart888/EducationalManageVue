<template>
    <div class="score">
        <Breadcrumb name1="就业管理"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-form :inline="true" :model="formEmployment">
                        <el-form-item label="学生姓名:">
                            <el-input v-model="formEmployment.name1" placeholder="学生姓名" style="width: 140px"></el-input>
                        </el-form-item>
                        <el-form-item label="班级:" prop="classname">
                            <el-select v-model="formEmployment.classname" placeholder="班级" style="width: 160px">
                                <el-option
                                v-for="item in ClassName"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getEmploymentList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table :data="employmentData.employmentList" stripe style="widt: 100%" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="studentid" label="学生学号"></el-table-column>
                <el-table-column prop="name" label="学生姓名"></el-table-column>
                <el-table-column prop="classname" label="班级"></el-table-column>
                <el-table-column prop="workprovince" label="工作省份"></el-table-column>
                <el-table-column prop="workunit" label="工作单位"></el-table-column>
                <el-table-column prop="wages" label="月工资"></el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                @size-change="handleSizeChange"
                :page-size="pageSize"
                :page-sizes="[5, 9, 13, 15]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="employmentData.total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import Breadcrumb from '../content/breadcrumb/Breadcrumb.vue'
export default {
  data () {
    return {
      // 当前的页数
      currentPage: 1,
      // 当前每次显示多少条数据
      pageSize: 5,
      // 获取用户列表的参数对象
      formEmployment: {},
      ClassName: [{ name: '', id: '' }],
      employmentData: {
        employmentList: [],
        total: 0
      },
      editDialogVisble: false,
      userInfo: {},
      editForm: {}
    }
  },
  methods: {
    async getClassName () {
      const { data: res } = await this.$http.get('util/class')
      this.ClassName = res.data
      // console.log(this.ClassName)
      // console.log(this.DepartmentName)
    },
    async getEmploymentList () {
      const { data: res } = await this.$http.get('admin/employment/' + this.currentPage + '/' + this.pageSize, {
        params: this.formEmployment
      })
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.employmentData.employmentList = res.data.records
        this.employmentData.total = res.data.total
      } else {
        this.$message.error(res.msg)
      }
      this.formEmployment = { name: '', classname: '' }
      // console.log(res)
    },
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.pageSize = newSize
      this.getEmploymentList()
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.getEmploymentList()
    }
  },
  created () {
    this.getClassName()
    this.getEmploymentList()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
