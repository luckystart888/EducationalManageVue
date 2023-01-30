<template>
    <div class="users">
    <Breadcrumb name1="用户管理" name2="学生管理" />
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="16">
        <!-- 搜索与添加区域 -->
            <el-form :inline="true" :model="formStu">
                <el-form-item label="姓名:">
                    <el-input v-model="formStu.name" placeholder="姓名" style="width: 160px"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="gender">
                    <el-select v-model="formStu.gender" placeholder="性别" style="width: 160px">
                        <el-option
                        v-for="item in Gender"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级:" prop="className">
                    <el-select v-model="formStu.className" placeholder="所属班级" style="width: 160px">
                        <el-option
                        v-for="item in ClassName"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUserList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户区域 -->
          <el-button type="primary" @click="addDialogVisible = true">用户添加</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userData.userList" stripe style="widt: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="userid" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="birthday" label="生日"></el-table-column>
        <el-table-column prop="indate" label="入学日期"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="className" label="班级"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.userid)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.userid)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :page-sizes="[5, 9, 13, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userData.total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="35%" @close="addDislogClosed">
      <!-- 内容主题区域 -->
      <el-form label-width="70px" ref="addFormRef" :model="addForm" :rules="addFormRules">
        <el-form-item label="工号" prop="userid" style="width: 70%">
          <el-input v-model.number="addForm.userid"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" style="width: 40%">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-select v-model="addForm.gender" placeholder="性别">
                <el-option
                v-for="item in Gender"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
            <el-date-picker
                v-model="addForm.birthday"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="入学日期" prop="indate">
            <el-date-picker
                v-model="addForm.indate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="tel" style="width: 70%">
          <el-input v-model.number="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
            <el-select v-model="addForm.className" placeholder="所属班级">
                <el-option
                v-for="item in ClassName"
                :key="item.id"
                :label="item.name"
                :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog title="修改用户" @close="aditClosed" :visible.sync="editDialogVisble" width="35%">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="工号" prop="userid" style="width: 70%">
          <el-input v-model.number="editForm.userid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" style="width: 40%">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
            <el-select v-model="editForm.gender" placeholder="性别">
                <el-option
                v-for="item in Gender"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
            <el-date-picker
                v-model="editForm.birthday"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="入学日期" prop="indate">
            <el-date-picker
                v-model="editForm.indate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="tel" style="width: 70%">
          <el-input v-model.number="editForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
            <el-select v-model="editForm.className" placeholder="所属班级">
                <el-option
                v-for="item in ClassName"
                :key="item.id"
                :label="item.name"
                :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisble = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userAddFormRulesMixin } from '@/common/mixin.js'
import Breadcrumb from '../content/breadcrumb/Breadcrumb.vue'
export default {
  mixins: [userAddFormRulesMixin],
  data () {
    return {
      // 当前的页数
      currentPage: 1,
      // 当前每次显示多少条数据
      pageSize: 5,
      // 获取用户列表的参数对象
      formStu: {
        // 搜索值
        name: '',
        gender: '',
        className: ''
      },
      Gender: [{ label: '男', value: 'nan' }, { label: '女', value: 'nv' }],
      ClassName: [{ name: '', id: '' }],
      Role: '',
      // 存放用户的数据和数量
      userData: {
        userList: [],
        total: 0
      },
      // 控制用户对话框的显示和隐藏
      addDialogVisible: false,
      // 添加用户数据的对象
      addForm: {},
      // 修改用户消息对话框显示和隐藏
      editDialogVisble: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 查询用户的对象
      editForm: {}
    }
  },
  components: {
    Breadcrumb
  },
  created () {
    this.getRole()
    this.getUserList()
    this.getClassName()
  },
  methods: {
    getRole () {
      const role = window.sessionStorage.getItem('role')
      if (role === '1') {
        this.Role = 'admin'
        // console.log(this.Role)
      }
      if (role === '2') {
        this.Role = 'teacher'
      }
    },
    async getClassName () {
      const { data: res } = await this.$http.get('util/class')
      this.ClassName = res.data
      console.log(this.ClassName)
      // console.log(this.DepartmentName)
    },
    async getUserList () {
      const { data: res } = await this.$http.get(this.Role + '/info/student/' + this.currentPage + '/' + this.pageSize, {
        params: this.formStu
      })
      if (res.code === 20041) {
        // this.$message.success(res.msg)
        this.userData.userList = res.data.records
        this.userData.total = res.data.total
      } else {
        this.$message.error(res.msg)
      }
      this.formStu = { name: '', gender: '', className: '' }
      // console.log(res)
    },
    // 监听 pagesize 改变事件 每页显示的个数
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.pageSize = newSize
      this.getUserList()
    },
    // 监听 页码值 改变的事件 当前页面值
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.currentPage = newPage
      this.getUserList()
    },
    // 监听添加用户的对话框关闭事件
    addDislogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮,添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // 可以发起添加用户请求
        const { data: res } = await this.$http.post(this.Role + '/info/student', this.addForm)
        if (res.code !== 20011) {
          return this.$message.error('添加失败')
        }else{
          this.$message.success('添加成功')
        }
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 添加成后重新获取用户数据,不需要用户手动刷新
        this.getUserList()
      })
    },
    // 展示编辑用于的对话框
    async showEditDialog (userid) {
      const { data: res } = await this.$http.get(this.Role + '/info/student/' + userid)
      if (res.code !== 20041) {
        return this.$message.error('查询用户数据失败~')
      }
      this.editForm = res.data
      console.log(this.editForm)
      this.editDialogVisble = true
      // return this.$message.success('查询用户数据成功~')
    },
    // 监听修改用户对话框的关闭事件
    aditClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(this.Role + '/info/student', this.editForm)
        if (res.code !== 20031) {
          return this.$message.error('更新用户信息失败!')
        }else{
          this.$message.success('更新用户信息成功!')
        }
        this.editDialogVisble = false
        this.getUserList()
      })
    },
    // 根据id删除对应的用户信息
    async removeUserById (userid) {
      // 询问用户是否删除用户
      const confirmRusult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '永久删除该用户', {
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
      this.$http.delete(this.Role + '/info/student/' + userid).then(res => {
        const { data: response } = res
        console.log(response)
        if (response.code !== 20021) {
          return this.$message.error('该用户删除失败')
        }else{
          this.$message.success('该用户已经删除')
        }
        this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
