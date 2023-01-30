<template>
    <div class="score">
        <Breadcrumb name1="成绩查询"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-table :data="scoreData.scoreList" stripe style="widt: 100%" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
                <el-table-column prop="teacherid" label="教师工号"></el-table-column>
                <el-table-column prop="name" label="教师姓名"></el-table-column>
                <el-table-column prop="score" label="分数"></el-table-column>
                <el-table-column prop="credit" label="学分"></el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                @size-change="handleSizeChange"
                :page-size="pageSize"
                :page-sizes="[5, 9, 13, 15]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="scoreData.total"
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
      scoreData: {
        scoreList: [],
        total: 0
      }
    }
  },
  methods: {
    async getScoreList () {
      const { data: res } = await this.$http.get('student/score/' + this.currentPage + '/' + this.pageSize)
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.scoreData.scoreList = res.data.records
        this.scoreData.total = res.data.total
      } else {
        this.$message.error(res.msg)
      }
      // console.log(res)
    },
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.pageSize = newSize
      this.getScoreList()
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.getScoreList()
    }
  },
  created () {
    this.getScoreList()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
