<template>
    <div class="score">
        <Breadcrumb name1="成绩管理"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="16">
                    <el-form :inline="true" :model="formScore">
                        <el-form-item label="学生姓名:">
                            <el-input v-model="formScore.name" placeholder="学生姓名" style="width: 160px"></el-input>
                        </el-form-item>
                        <el-form-item label="课程名称:" prop="courseName">
                            <el-select v-model="formScore.courseName" placeholder="课程名称" style="width: 160px">
                                <el-option
                                v-for="item in CourseName"
                                :key="item.courseid"
                                :label="item.coursename"
                                :value="item.coursename">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级:" prop="classname">
                            <el-select v-model="formScore.classname" placeholder="班级" style="width: 160px">
                                <el-option
                                v-for="item in ClassName"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getScoreList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table :data="scoreData.scoreList" stripe style="widt: 100%" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="courseName" label="课程名称"></el-table-column>
                <el-table-column prop="studentid" label="学生学号"></el-table-column>
                <el-table-column prop="name" label="学生姓名"></el-table-column>
                <el-table-column prop="classname" label="班级"></el-table-column>
                <el-table-column prop="score" label="分数"></el-table-column>
                <el-table-column prop="credit" label="学分"></el-table-column>
                <el-table-column label="操作" width="180px">
                <template v-slot="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">打分</el-button>
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
                :total="scoreData.total"
            >
            </el-pagination>
        </el-card>
        <el-dialog title="打分" @close="aditClosed" :visible.sync="editDialogVisble" width="35%">
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
                <el-form-item label="课程名称" prop="courseName" style="width: 60%">
                    <el-input v-model="editForm.courseName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学生学号" prop="studentid" style="width: 60%">
                    <el-input v-model="editForm.studentid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学生姓名" prop="name" style="width: 60%">
                    <el-input v-model="editForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="classname" style="width: 40%">
                    <el-input v-model="editForm.classname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="分数" prop="score" style="width: 40%">
                    <el-input v-model="editForm.score"></el-input>
                </el-form-item>
                <el-form-item label="学分" prop="credit" style="width: 40%">
                    <el-input v-model="editForm.credit" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisble = false">取 消</el-button>
                <el-button type="primary" @click="editscoreInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { scoreFormRulesMixin } from '@/common/mixin.js'
import Breadcrumb from '../content/breadcrumb/Breadcrumb.vue'
export default {
  mixins: [scoreFormRulesMixin],
  data () {
    return {
      // 当前的页数
      currentPage: 1,
      // 当前每次显示多少条数据
      pageSize: 5,
      // 获取用户列表的参数对象
      formScore: {},
      ClassName: [{ name: '', id: '' }],
      CourseName: [{ coursename: '', courseid: '' }],
      scoreData: {
        scoreList: [],
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
    async getCourseName () {
      const { data: res } = await this.$http.get('util/tea/course')
      this.CourseName = res.data
      // console.log(this.ClassName)
      // console.log(this.DepartmentName)
    },
    async getScoreList () {
      const { data: res } = await this.$http.get('teacher/score/' + this.currentPage + '/' + this.pageSize, {
        params: this.formScore
      })
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.scoreData.scoreList = res.data.records
        this.scoreData.total = res.data.total
      } else {
        this.$message.error(res.msg)
      }
      this.formScore = { name: '', courseName: '', classname: '' }
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
    },
    async showEditDialog (scoreid) {
      const { data: res } = await this.$http.get('teacher/score/' + scoreid)
      if (res.code !== 20041) {
        return this.$message.error('查询成绩失败~')
      }
      this.editForm = res.data
      this.editDialogVisble = true
      // return this.$message.success('查询用户数据成功~')
    },
    // 监听修改用户对话框的关闭事件
    aditClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editscoreInfo () {
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put('teacher/score', this.editForm)
        if (res.code !== 20031) {
          return this.$message.error('更新成绩失败!')
        }else{
          this.$message.success('更新成绩成功!')
        }
        this.editDialogVisble = false
        this.getScoreList()
      })
    }
  },
  created () {
    this.getClassName()
    this.getCourseName()
    this.getScoreList()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
