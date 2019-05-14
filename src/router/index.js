import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import New from '../components/new.vue'
import Edit from '../components/edit.vue'
import Login from '../components/login.vue'
import Banner from '../components/Banner.vue'
import Main from '../components/Main.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: Login,
      component: Login
    },
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/main',
      name: Main,
      component: Main,
      children: [
        {
          path: '/home',
          name: Home,
          component: Home
        },
        {
          path: '/banner',
          name: Banner,
          component: Banner
        },
        {
          path: '/new',
          name: New,
          component: New
        },
        {
          path: '/edit',
          name: Edit,
          component: Edit
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    // 有token，放行
    next()
  } else {
    next('/login')
  }
})

export default router
