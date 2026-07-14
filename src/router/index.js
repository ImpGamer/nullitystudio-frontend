import HomePage from '@pages/HomePage.vue'
import GamesPage from '@pages/GamesPage.vue'
import About_UsPage from '@pages/About_UsPage.vue'
import ContactPage from '@pages/ContactPage.vue'
import AdminLoginPage from '@pages/AdminLoginPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@layouts/MainLayout.vue'
import NotFoundPage from '@pages/NotFoundPage.vue'

const principalGameTitle = 'Nullity Studio Web';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomePage,
          meta: { title: `${principalGameTitle} | Home` }
        },
        {
          path: 'games',
          name: 'games',
          component: GamesPage,
          meta: { title: `${principalGameTitle} | Our Games` }
        },
        {
          path: 'about-us',
          name: 'about-us',
          meta: { title: `${principalGameTitle} | About Us` },
          component: About_UsPage
        },
        {
          path: 'contact',
          name: 'contact',
          component: ContactPage,
          meta: { title: `${principalGameTitle} | Contact Us` },
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          meta: { title: `${principalGameTitle} | Not Found` },
          component: NotFoundPage,
        }
      ]
    },
    {
      path: '/admin',
      component: () => AdminLoginPage,
      children:
        [

        ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Page',
    next()
})

export default router
