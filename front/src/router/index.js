import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/top-words',
    name: 'top-words',
    component: () => import(/* webpackChunkName: "about" */ '../views/TopWords.vue')
  },
  {
    path: '/word-frequency',
    name: 'word-frequency',
    component: () => import(/* webpackChunkName: "about" */ '../views/WordFrequency.vue')
  },
  {
    path: '/word-setence',
    name: 'word-setence',
    component: () => import(/* webpackChunkName: "about" */ '../views/WordSentences.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
