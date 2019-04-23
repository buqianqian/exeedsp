import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import New from '../components/new.vue'
import Edit from '../components/edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: Home,
      component: Home
    },
    {
      path: '/home',
      name: Home,
      component: Home
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
})
