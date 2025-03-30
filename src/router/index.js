import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FeaturesView from '../views/FeaturesView.vue'
import TechView from '../views/TechView.vue'
import DemoView from '../views/DemoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/features',
    name: 'features',
    component: FeaturesView
  },
  {
    path: '/tech',
    name: 'tech',
    component: TechView
  },
  {
    path: '/demo',
    name: 'demo',
    component: DemoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router 