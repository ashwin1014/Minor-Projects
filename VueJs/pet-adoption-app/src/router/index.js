import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cats',
    name: 'Cats',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cats" */ '../views/Cats.vue')
  },
  {
    path: '/dogs',
    name: 'Dogs',
    component: () => import(/* webpackChunkName: "dogs" */ '../views/Dogs.vue')
  },
  {
    path: '/pets/:species/:id',
    name: 'Pet',
    component: () => import(/* webpackChunkName: "pet" */ '../views/Pet.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
