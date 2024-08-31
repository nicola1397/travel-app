import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import TripDetail from '../views/TripDetail.vue'
// import TripCreate from '../components/TripCreate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/trip/:index',
      name: 'trip.show',
      component: TripDetail
    }
  ]
})

export default router
// {
//   path: '/create/',
//   name: 'trip.create',
//   component: TripCreate
// }
