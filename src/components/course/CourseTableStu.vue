<template>
    <div class="courseTable">
        <Breadcrumb name1="课表查询"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-table :data="courseData.courseList" stripe style="widt: 100%" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="coursename" label="课程名"></el-table-column>
                <el-table-column prop="name" label="教师姓名"></el-table-column>
                <el-table-column prop="coursetime" label="上课时间"></el-table-column>
                <el-table-column prop="classroom" label="上课教室"></el-table-column>
                <el-table-column prop="courseweek" label="上课日期"></el-table-column>
                <el-table-column prop="coursetype" label="课程类型"></el-table-column>
                <el-table-column prop="classname" label="班级"></el-table-column>
                <el-table-column prop="credit" label="学分"></el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                @size-change="handleSizeChange"
                :page-size="pageSize"
                :page-sizes="[5, 9, 13, 15]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="courseData.total"
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
      courseData: {
        courseList: [],
        total: 0
      }
    }
  },
  methods: {
    async getCourseList () {
      const { data: res } = await this.$http.get('student/courseTable/' + this.currentPage + '/' + this.pageSize, {
        params: this.formCourse
      })
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.courseData.courseList = res.data.records
        this.courseData.total = res.data.total
      } else {
        this.$message.error(res.msg)
      }
      this.formCourse = { coursename: '', classname: '' }
      // console.log(res)
    },
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.pageSize = newSize
      this.getCourseList()
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.getCourseList()
    }
  },
  created () {
    this.getCourseList()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
