import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import New from '../components/new.vue'
import Edit from '../components/edit.vue'
import Login from '../components/login.vue'
import Banner from '../components/Banner.vue'
import Main from '../components/Main.vue'
import EditBanner from '../components/EditBanner.vue'
import Newbanner from '../components/Newbanner.vue'

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
        },
        {
          path: '/editBanner',
          name: EditBanner,
          component: EditBanner
        },
        {
          path: '/newbanner',
          name: Newbanner,
          component: Newbanner
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('user')
  if (to.path === '/login' || user) {
    next()
  } else {
    next('/login')
  }
})

export default router
