export const userAddFormRulesMixin = {
  data () {
    // 验证邮箱的规则
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/ // 验证邮箱的正则表达式
      if (regEmail.test(value)) {
        return callback() // 合法邮箱
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机的规则
    const checkMobeli = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }

    // 验证工号的规则
    const checkUserid = (rule, value, callback) => {
      const router_path = this.$route.path
      let regUserid = ''
      if (router_path === '/student') {
        // console.log(router_path)
        regUserid = /^12\d{3,4}$/
        if (regUserid.test(value)) {
          return callback()
        }
        // 返回一个错误提示
        callback(new Error('请输入以12开头的5-6位数'))
      }
      if (router_path === '/teacher') {
        // console.log(router_path)
        regUserid = /^11\d{3,4}$/ // 验证的正则表达式
        if (regUserid.test(value)) {
          return callback() // 合法用户
        }
        // 返回一个错误提示
        callback(new Error('请输入以11开头的5-6位数'))
      }
    }

    const checkDate = (rule, value, callback) => {
      const date = new Date()
      // console.log(date)
      // console.log(new Date(value))
      if (new Date(value) <= date) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('日期不能大于现在'))
    }
    return {
      // 添加表单的验证规则对象
      addFormRules: {
        userid: [
          { required: true, message: '请输入学号/工号', trigger: 'blur' },
          { validator: checkUserid, trigger: 'blur' },
          { type: 'number', message: '学号/工号为数字' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '学院不能为空，请选择', trigger: 'blur' }
        ],
        className: [
          { required: true, message: '班级不能为空，请选择', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobeli, trigger: 'blur' }
        ],
        birthday: [
          { validator: checkDate, trigger: 'blur' }
        ],
        indate: [
          { validator: checkDate, trigger: 'blur' }
        ]
      }
    }
  }
}

export const updatePwdFormRulesMixin = {
  data () {
    const checkNewPwd = (rule, value, callback) => {
      if (value === this.updatePwdForm.newPwd) {
        return callback() // 合法邮箱
      }
      // 返回一个错误提示
      callback(new Error('两次输入的密码不一致'))
    }
    return {
      // 添加表单的验证规则
      updatePwdFormRules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: '请再次输入', trigger: 'blur' },
          { validator: checkNewPwd, trigger: 'blur' }
        ]
      }
    }
  }
}

export const courseAddFormRulesMixin = {
  data () {
    const checkCredit = (rule, value, callback) => {
      const regCredit = /(^[0-9]{1,2}$)|(^[0-9]{1,2}[\.]{1}[0-9]{1,2}$)/
      if (regCredit.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('学分为1-2位数字或两位小数'))
    }
    return {
      // 添加商品验证规则
      addFormRules: {
        coursename: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        teacherid: [
          { required: true, message: '请输入教师工号', trigger: 'blur' },
          { type: 'number', message: '教师工号为数字' }
        ],
        classname: [{ required: true, message: '班级不能为空，请选择', trigger: 'blur' }],
        classid: [{ required: true, message: '班级不能为空，请选择', trigger: 'blur' }],
        credit: [{ required: true, message: '请输课程学分', trigger: 'blur' }, { validator: checkCredit, trigger: 'blur' }]
      }
    }
  }
}

export const scoreFormRulesMixin = {
  data () {
    const checkScore = (rule, value, callback) => {
      const regScore = /(^[0-9]{1,2}$)|(^[0-9]{1,2}[\.]{1}[0-9]{1,2}$)/
      if (regScore.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('分数为1-2位数字两位小数'))
    }
    return {
      // 添加商品验证规则
      addFormRules: {
        score: [{ validator: checkScore, trigger: 'blur' }]
      }
    }
  }
}

export const employmentFormRulesMixin = {
  data () {
    const checkWages = (rule, value, callback) => {
      const regWages = /(^[0-9]{4,6}$)|(^[0-9]{4,6}[\.]{1}[0-9]{1,2}$)|^$/
      if (regWages.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('工资4-6位，可保留两位小数'))
    }
    return {
      // 添加商品验证规则
      employmentFormRules: {
        wages: [{ validator: checkWages, trigger: 'blur' }]
      }
    }
  }
}
