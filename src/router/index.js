import Vue from 'vue'
import VueRouter from 'vue-router'
import Imp1 from '../views/Implementation1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'imp1',
    component: Imp1
  },
  {
    path: '/imp2',
    name: 'imp2',
    component: () => import('../views/Implementation2.vue')
  },
  {path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

export default router
