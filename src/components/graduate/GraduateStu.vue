<template>
    <div class="graduate">
        <Breadcrumb name1="毕业查询"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-descriptions class="margin-top" title="毕业学分信息" :column="6" :size="size" border>
                <el-descriptions-item>
                <template slot="label">
                    学号
                </template>
                {{graduateData.studentid}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    姓名
                </template>
                {{graduateData.name}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    班级
                </template>
                {{graduateData.classname}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    毕业所需学分
                </template>
                {{graduateData.credit1}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    总获得学分
                </template>
                {{graduateData.credit2}}
                </el-descriptions-item>
                <el-descriptions-item>
                <template slot="label">
                    能否毕业
                </template>
                {{graduateData.status}}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>
getGraduateList
<script>
import Breadcrumb from '../content/breadcrumb/Breadcrumb.vue'
export default {
  data () {
    return {
      graduateData: {}
    }
  },
  methods: {
    async getGraduateList () {
      const { data: res } = await this.$http.get('student/graduate')
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.graduateData = res.data
      } else {
        this.$message.error(res.msg)
      }
      // console.log(res)
    },
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.pageSize = newSize
      this.getGraduateList()
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.getGraduateList()
    }
  },
  created () {
    this.getGraduateList()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
