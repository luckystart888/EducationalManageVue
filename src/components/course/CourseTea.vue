<template>
    <div class="course">
        <Breadcrumb name1="课程课表" name2="课程管理"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-form :inline="true" :model="formCourse">
                        <el-form-item label="课程名:">
                            <el-input v-model="formCourse.coursename" placeholder="课程名" style="width: 160px"></el-input>
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
                <el-col :span="4">
                    <!-- 添加课程区域 -->
                    <el-button type="primary" @click="addDialogVisible = true">课程添加</el-button>
                </el-col>
            </el-row>
            <el-table :data="courseData.courseList" stripe style="widt: 100%" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="coursename" label="课程名"></el-table-column>
                <el-table-column prop="name" label="教师姓名"></el-table-column>
                <el-table-column prop="courseweek" label="上课日期"></el-table-column>
                <el-table-column prop="coursetype" label="课程类型"></el-table-column>
                <el-table-column prop="classname" label="班级"></el-table-column>
                <el-table-column prop="credit" label="学分"></el-table-column>
                <el-table-column label="操作" width="180px">
                <template v-slot="scope">
                  <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="showAddTableDialog(scope.row.courseid)"></el-button>
                  <!-- 修改按钮 -->
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.courseid)"></el-button>
                  <!-- 删除按钮 -->
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCourseById(scope.row.courseid)"></el-button>
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
        <el-dialog title="添加课表" @close="addTableClosed" :visible.sync="addTableDialogVisble" width="35%">
            <el-form :model="addTableForm" :rules="addFormRules" ref="addTableFormRef" label-width="90px">
                <el-form-item label="课程名称" prop="coursename" style="width: 60%">
                    <el-input v-model="addTableForm.coursename" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="教师姓名" prop="name" style="width: 60%">
                    <el-input v-model="addTableForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="上课时间" prop="coursetime" style="width: 60%">
                    <el-input v-model="addTableForm.coursetime"></el-input>
                </el-form-item>
                <el-form-item label="上课教室" prop="classroom" style="width: 60%">
                    <el-input v-model="addTableForm.classroom"></el-input>
                </el-form-item>
                <el-form-item label="上课日期" prop="courseweek" style="width: 40%">
                    <el-input v-model="addTableForm.courseweek" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" prop="coursetype" style="width: 40%">
                    <el-input v-model="addTableForm.coursetype" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="classname" style="width: 60%">
                    <el-input v-model="addTableForm.classname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="credit" style="width: 40%">
                    <el-input v-model="addTableForm.credit" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTableDialogVisble = false">取 消</el-button>
                <el-button type="primary" @click="addCourseTable">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加课程" :visible.sync="addDialogVisible" width="35%" @close="addDislogClosed">
        <!-- 内容主题区域 -->
        <el-form label-width="90px" ref="addFormRef" :model="addForm" :rules="addFormRules">
            <el-form-item label="课程名称" prop="coursename" style="width: 60%">
                <el-input v-model="addForm.coursename"></el-input>
            </el-form-item>
            <el-form-item label="上课日期" prop="courseweek" style="width: 40%">
                <el-input v-model="addForm.courseweek"></el-input>
            </el-form-item>
            <el-form-item label="课程类型" prop="coursetype">
                <el-select v-model="addForm.coursetype" placeholder="课程类型" style="width: 160px">
                    <el-option
                    v-for="item in CourseType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级" prop="classname">
                <el-select v-model="addForm.classname" placeholder="班级" style="width: 160px">
                    <el-option
                    v-for="item in ClassName"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学分" prop="credit" style="width: 40%">
                <el-input v-model="addForm.credit"></el-input>
            </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCourse">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog title="修改课程" @close="aditClosed" :visible.sync="editDialogVisble" width="35%">
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
                <el-form-item label="课程名称" prop="coursename" style="width: 60%">
                    <el-input v-model="editForm.coursename"></el-input>
                </el-form-item>
                <el-form-item label="上课日期" prop="courseweek" style="width: 40%">
                    <el-input v-model="editForm.courseweek"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" prop="coursetype">
                    <el-select v-model="editForm.coursetype" placeholder="课程类型" style="width: 160px">
                        <el-option
                        v-for="item in CourseType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="classname">
                    <el-select v-model="editForm.classname" placeholder="班级" style="width: 160px">
                        <el-option
                        v-for="item in ClassName"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学分" prop="credit" style="width: 40%">
                    <el-input v-model="editForm.credit"></el-input>
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
      formCourse: { coursename: '', classname: '' },
      ClassName: [{ name: '', id: '' }],
      CourseType: [{ label: '必修', value: '必修' }, { label: '选修', value: '选修' }],
      courseData: {
        courseList: [],
        total: 0
      },
      addTableDialogVisble: false,
      addTableForm: {},
      addDialogVisible: false,
      addForm: {},
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
      const { data: res } = await this.$http.get('teacher/course/' + this.currentPage + '/' + this.pageSize, {
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
    addCourse () {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // 可以发起添加用户请求
        const { data: res } = await this.$http.post('teacher/course', this.addForm)
        if (res.code !== 20011) {
          return this.$message.error('添加失败')
        }
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 添加成后重新获取用户数据,不需要用户手动刷新
        this.getCourseList()
        return this.$message.success('添加成功')
      })
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
    // 监听添加用户的对话框关闭事件
    addDislogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addTableClosed(){
      this.$refs.addTableFormRef.resetFields()
    },
    addCourseTable () {
      this.$refs.addTableFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // 可以发起添加用户请求
        const { data: res } = await this.$http.post('teacher/courseTable', this.addTableForm)
        if (res.code !== 20011) {
          return this.$message.error('添加失败')
        }else{
          this.$message.success('添加成功，请前往课表管理查看')
        }
        this.addTableDialogVisble = false
      })
    },
    async showAddTableDialog (courseid) {
      const { data: res } = await this.$http.get('teacher/course/' + courseid)
      if (res.code !== 20041) {
        return this.$message.error('查询用户数据失败~')
      }
      this.addTableForm = res.data
      this.addTableDialogVisble = true
      // return this.$message.success('查询用户数据成功~')
    },
    async showEditDialog (courseid) {
      const { data: res } = await this.$http.get('teacher/course/' + courseid)
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
        const { data: res } = await this.$http.put('teacher/course', this.editForm)
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
      const confirmRusult = await this.$confirm('此操作将该课程删除, 是否继续?', '删除该课程', {
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
      this.$http.delete('teacher/course/' + courseid).then(res => {
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
