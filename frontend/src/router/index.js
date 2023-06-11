import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/profile/ProfileView.vue'
import UpdateProfileView from '../views/profile/UpdateProfileView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import NotFound from '../views/auth/NotFound.vue'
import CreateManager from '../views/admin/CreateManager.vue'
import CreateObject from '../views/admin/CreateObject.vue'
import SuccessfulRegistration from '../views/auth/SuccessfulRegistration.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/successful',
    name: 'successful',
    component: SuccessfulRegistration
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/updateProfile/:id',
    name: 'updateProfile',
    component: UpdateProfileView
  },
  {
    path: '/createManager',
    name: 'createManager',
    component: CreateManager
  },
  {
    path: '/createObject',
    name: 'createObject',
    component: CreateObject
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
