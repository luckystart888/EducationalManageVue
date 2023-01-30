import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Teacher from '../components/user/Teacher.vue'
import Student from '../components/user/Student.vue'
import UpdatePasswd from '../components/UpdatePasswd.vue'
import ResetPasswd from '../components/ResetPasswd.vue'
import CourseTableAd from '../components/course/CourseTableAd.vue'
import CourseTableTea from '../components/course/CourseTableTea.vue'
import CourseTableStu from '../components/course/CourseTableStu.vue'
import CourseAd from '../components/course/CourseAd.vue'
import CourseTea from '../components/course/CourseTea.vue'
import ScoreAd from '../components/score/ScoreAd.vue'
import ScoreTea from '../components/score/ScoreTea.vue'
import ScoreStu from '../components/score/ScoreStu.vue'
import EmploymentAd from '../components/employment/EmploymentAd.vue'
import EmploymentStu from '../components/employment/EmploymentStu.vue'
import GraduateAd from '../components/graduate/GraduateAd.vue'
import GraduateStu from '../components/graduate/GraduateStu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/updatepasswd', component: UpdatePasswd },
      { path: '/teacher', component: Teacher },
      { path: '/student', component: Student },
      { path: '/courseAd', component: CourseAd },
      { path: '/courseTableAd', component: CourseTableAd },
      { path: '/scoreAd', component: ScoreAd },
      { path: '/scoreAd', component: ScoreAd },
      { path: '/graduateAd', component: GraduateAd },
      { path: '/employmentAd', component: EmploymentAd },
      { path: '/resetpasswd', component: ResetPasswd },
      { path: '/student', component: Student },
      { path: '/courseTea', component: CourseTea },
      { path: '/courseTableTea', component: CourseTableTea },
      { path: '/scoreTea', component: ScoreTea },
      { path: '/courseTableStu', component: CourseTableStu },
      { path: '/scoreStu', component: ScoreStu },
      { path: '/graduateStu', component: GraduateStu },
      { path: '/employmentStu', component: EmploymentStu }
    ]
  }
]

// [
//   { path: '/welcome', component: Welcome},
//   { path: '/updatepasswd', component: UpdatePasswd},
//   { path: '/teacher', component: Teacher},
//   { path: '/student', component: Student},
//   { path: '/courseAd', component: CourseAd},
//   { path: '/scoreAd', component: ScoreAd},
//   { path: '/scoreAd', component: ScoreAd},
//   { path: '/employmentAd', component: EmploymentAd},
//   { path: '/student', component: Student},
//   { path: '/courseTea', component: CourseTea},
//   { path: '/scoreTea', component: ScoreTea},
//   { path: '/courseStu', component: CourseStu},
//   { path: '/scoreStu', component: ScoreStu},
//   { path: '/employmentStu', component: EmploymentStu}
// ]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const userStr = window.sessionStorage.getItem('userid')
  if (to.path === '/login') {
    if (userStr) {
      return next('/home')
    } else {
      return next()
    }
  }

  if (!userStr) return next('/login')
  next()
})

export default router
