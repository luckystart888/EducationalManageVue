<template>
    <div class="courseTable">
        <Breadcrumb name1="课程课表" name2="课表管理"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-form :inline="true" :model="formCourse">
                        <el-form-item label="课程名:">
                            <el-input v-model="formCourse.coursename" placeholder="课程名" style="width: 160px"></el-input>
                        </el-form-item>
                        <el-form-item label="教师姓名:">
                            <el-input v-model="formCourse.name" placeholder="教师姓名" style="width: 160px"></el-input>
                        </el-form-item>
                        <el-form-item label="班级:" prop="classname">
                            <el-select v-model="formCourse.classname" placeholder="班级" style="width: 160px">
                                <el-option
                                v-for="item in ClassName"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getCourseList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
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
                <el-table-column label="操作" width="180px">
                <template v-slot="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCourseById(scope.row.id)"></el-button>
                </template>
                </el-table-column>
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
        <el-dialog title="修改课表" @close="aditClosed" :visible.sync="editDialogVisble" width="35%">
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
                <el-form-item label="课程名称" prop="coursename" style="width: 60%">
                    <el-input v-model="editForm.coursename" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="教师姓名" prop="name" style="width: 60%">
                    <el-input v-model="editForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="上课时间" prop="coursetime" style="width: 60%">
                    <el-input v-model="editForm.coursetime"></el-input>
                </el-form-item>
                <el-form-item label="上课教室" prop="classroom" style="width: 60%">
                    <el-input v-model="editForm.classroom"></el-input>
                </el-form-item>
                <el-form-item label="上课日期" prop="courseweek" style="width: 40%">
                    <el-input v-model="editForm.courseweek" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" prop="coursetype" style="width: 40%">
                    <el-input v-model="editForm.coursetype" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="classname" style="width: 60%">
                    <el-input v-model="editForm.classname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="credit" style="width: 40%">
                    <el-input v-model="editForm.credit" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisble = false">取 消</el-button>
                <el-button type="primary" @click="editCourseInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { courseAddFormRulesMixin } from '@/common/mixin.js'
import Breadcrumb from '../content/breadcrumb/Breadcrumb.vue'
export default {
  mixins: [courseAddFormRulesMixin],
  data () {
    return {
      // 当前的页数
      currentPage: 1,
      // 当前每次显示多少条数据
      pageSize: 5,
      // 获取用户列表的参数对象
      formCourse: { coursename: '', name: '', classname: '' },
      ClassName: [{ name: '', id: '' }],
      CourseType: [{ label: '必修', value: '必修' }, { label: '选修', value: '选修' }],
      courseData: {
        courseList: [],
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
    async getCourseList () {
      const { data: res } = await this.$http.get('admin/courseTable/' + this.currentPage + '/' + this.pageSize, {
        params: this.formCourse
      })
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.courseData.courseList = res.data.records
        this.courseData.total = res.data.total
      } else {
        this.$message.error(res.msg)
      }
      this.formCourse = { coursename: '', name: '', classname: '' }
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
    },
    async showEditDialog (courseid) {
      const { data: res } = await this.$http.get('admin/courseTable/' + courseid)
      if (res.code !== 20041) {
        return this.$message.error('查询用户数据失败~')
      }
      this.editForm = res.data
      this.editDialogVisble = true
      // return this.$message.success('查询用户数据成功~')
    },
    // 监听修改用户对话框的关闭事件
    aditClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editCourseInfo () {
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put('admin/courseTable', this.editForm)
        if (res.code !== 20031) {
          return this.$message.error('更新课程信息失败!')
        }else{
          this.$message.success('更新课程信息成功!')
        }
        this.editDialogVisble = false
        this.getCourseList()
      })
    },
    // 根据id删除对应的用户信息
    async removeCourseById (courseid) {
      // 询问用户是否删除用户
      const confirmRusult = await this.$confirm('此操作将该课表删除, 是否继续?', '删除该课表', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmRusult)
      // 用户点击了删除,则返回字符串 confirm
      // 用户取消了删除,则返回字符串 cancel
      if (confirmRusult !== 'confirm') {
        return this.$message.info('已经取消了删除')
      }
      this.$http.delete('admin/courseTable/' + courseid).then(res => {
        const { data: response } = res
        console.log(response)
        if (response.code !== 20021) {
          return this.$message.error('删除失败')
        }else{
          this.$message.success('删除成功')
        }
        this.getCourseList()
      })
    }
  },
  created () {
    this.getClassName()
    this.getCourseList()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
