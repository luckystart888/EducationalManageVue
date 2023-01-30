<template>
    <div class="graduate">
        <Breadcrumb name1="毕业管理"/>
        <!-- 卡片视图区域 -->
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="20">
                    <el-form :inline="true" :model="formGraduate">
                        <el-form-item label="学生姓名:">
                            <el-input v-model="formGraduate.name" placeholder="学生姓名" style="width: 140px"></el-input>
                        </el-form-item>
                        <el-form-item label="班级:" prop="classname">
                            <el-select v-model="formGraduate.classname" placeholder="班级" style="width: 160px">
                                <el-option
                                v-for="item in ClassName"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getGraduateList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-table :data="graduateData.graduateList" stripe style="widt: 100%" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="studentid" label="学生学号"></el-table-column>
                <el-table-column prop="name" label="学生姓名"></el-table-column>
                <el-table-column prop="classname" label="班级"></el-table-column>
                <el-table-column prop="credit1" label="毕业所需学分"></el-table-column>
                <el-table-column prop="credit2" label="总获得学分"></el-table-column>
                <el-table-column prop="status" label="能否毕业"></el-table-column>
                <el-table-column label="操作" width="180px">
                <template v-slot="scope">
                    <!-- 修改按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.studentid)">毕业</el-button>
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
                :total="graduateData.total"
            >
            </el-pagination>
        </el-card>
        <el-dialog title="打分" @close="aditClosed" :visible.sync="editDialogVisble" width="35%">
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="90px">
                <el-form-item label="学生学号" prop="studentid" style="width: 60%">
                    <el-input v-model="editForm.studentid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学生姓名" prop="name" style="width: 60%">
                    <el-input v-model="editForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="classname" style="width: 60%">
                    <el-input v-model="editForm.classname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="毕业所需学分" prop="credit1" style="width: 60%">
                    <el-input v-model="editForm.credit1" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="总获得学分" prop="credit2" style="width: 60%">
                    <el-input v-model="editForm.credit2" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="能否毕业" prop="status">
                            <el-select v-model="editForm.status" placeholder="能否毕业" style="width: 160px">
                                <el-option
                                v-for="item in Status"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                            </el-select>
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
import Breadcrumb from '../content/breadcrumb/Breadcrumb.vue'
export default {
  data () {
    return {
      // 当前的页数
      currentPage: 1,
      // 当前每次显示多少条数据
      pageSize: 5,
      // 获取用户列表的参数对象
      formGraduate: {},
      ClassName: [{ name: '', id: '' }],
      Status: [{ label: '可毕业', value: '1' }, { label: '不可毕业', value: '2' }],
      graduateData: {
        graduateList: [],
        total: 0
      },
      editDialogVisble: false,
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
    async getGraduateList () {
      const { data: res } = await this.$http.get('admin/graduate/' + this.currentPage + '/' + this.pageSize, {
        params: this.formGraduate
      })
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.graduateData.graduateList = res.data.records
        this.graduateData.total = res.data.total
      } else {
        this.$message.error(res.msg)
      }
      this.formGraduate = { name: '', classname: '' }
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
    },
    async showEditDialog (studentid) {
      const { data: res } = await this.$http.get('admin/graduate/' + studentid)
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
        const { data: res } = await this.$http.put('admin/graduate', this.editForm)
        if (res.code !== 20031) {
          return this.$message.error('更新成绩失败!')
        }else{
          this.$message.success('更新成绩成功!')
        }
        this.editDialogVisble = false
        this.getGraduateList()
      })
    }
  },
  created () {
    this.getClassName()
    this.getGraduateList()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
</style>
