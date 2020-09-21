import Vue from 'vue'
import VueRouter from 'vue-router'
import Criteria from '../views/Criteria'
import Alternative from '../views/Alternative'
import CriteriaMatrix from '../views/CriteriaMatrix'
import AlternativeMatrix from '../views/AlternativeMatrix'
import Result from '../views/Result'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Criteria',
    component: Criteria
  },
  {
    path: '/alternatives',
    name: 'Alternative',
    component: Alternative
  },
  {
    path: '/criteria-matrix',
    name: 'CriteriaMatrix',
    component: CriteriaMatrix
  },
  {
    path: '/alternative-matrix',
    name: 'AlternativeMatrix',
    component: AlternativeMatrix
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
