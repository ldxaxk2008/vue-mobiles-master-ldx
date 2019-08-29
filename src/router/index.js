import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: (resolve) => require(['@/pages/index/home'], resolve)
        },
        {
          path: '/user',
          name: 'user',
          component: (resolve) => require(['@/pages/index/user'], resolve)
        }
      ]
    },
    {
      path: '/',
      name: 'levelup', // 引导页专用
      component: (resolve) => require(['@/pages/levelup'], resolve),
      redirect: '/levelup/experience',
      children: [
        {
          path: '/levelup/:id',
          name: 'experience',
          component: (resolve) => require(['@/pages/levelup'], resolve)
        }]
    },
    {
      path: '/',
      name: 'login',
      component: (resolve) => require(['@/pages/loginPage'], resolve),
      redirect: '/loginPage',
      children: [
        {
          path: '/loginPage',
          name: 'loginPage',
          component: (resolve) => require(['@/pages/loginPage'], resolve)
        }]
    },
    // {
    //   path: '/Home/Detail',
    //   name: 'Detail',
    //   component: (resolve) => require(['@/pages/detail'], resolve)
    // },
    {
      path: '/User/Task',
      name: 'Task',
      component: (resolve) => require(['@/pages/user/task'], resolve)
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: (resolve) => require(['@/pages/chat/chatRoom'], resolve)
    },
    {
      path: '/Pay',
      name: 'Pay',
      component: (resolve) => require(['@/pages/pay/pay'], resolve)
    },
    {
      path: '/User/TaskList/:id',
      name: 'TaskList',
      component: (resolve) => require(['@/pages/taskList/taskList'], resolve)
    },
    {
      path: '/User/Student/:id',
      name: 'student',
      component: (resolve) => require(['@/pages/student/student'], resolve)
    },
    {
      path: '/User/acceptTask',
      name: 'acceptTask',
      component: (resolve) => require(['@/pages/acceptTask/acceptTask'], resolve)
    },
    {
      path: '/Register',
      name: 'Register',
      component: (resolve) => require(['@/pages/register'], resolve)
    },
    {
      path: '/Registercom',
      name: 'Registercom',
      component: (resolve) => require(['@/pages/registercom'], resolve)
    },
    {
      path: '/taskeditor/:id',
      name: 'taskeditor',
      component: (resolve) => require(['@/pages/taskEditor/task'], resolve)
    },
    {
      path: '/message',
      name: 'message',
      component: (resolve) => require(['@/pages/messagelist'], resolve)
    },
    {
      path: '/error',
      name: 'error',
      component: (resolve) => require(['@/pages/taskpage/error'], resolve)
    },
    {
      path: '/success/:id',
      name: 'success',
      component: (resolve) => require(['@/pages/taskpage/success'], resolve)
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: (resolve) => require(['@/pages/evaluate'], resolve)
    },
    {
      path: '/registpage',
      name: 'registpage',
      component: (resolve) => require(['@/pages/registPage'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: (resolve) => require(['@/pages/mine'], resolve)
    },
    {
      path: '/agreepage',
      name: 'agreepage',
      component: (resolve) => require(['@/pages/agreepage'], resolve)
    }
  ]
})
