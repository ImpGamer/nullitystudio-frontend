import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@pages/HomePage.vue'
import GamesPage from '@pages/GamesPage.vue'
import AdminLoginPage from '@pages/AdminLoginPage.vue'
import MainLayout from '@layouts/MainLayout.vue'
import NewsPage from '@pages/NewsPage.vue'

const webTitle = 'Nullity Studio'
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    }
  }

  return {
    top: 0,
  }
}

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
          meta: {
            title: `${webTitle} | Home`,
          },
        },
        {
          path: '/news',
          name: 'news',
          component: NewsPage,
          meta: {
            title: `${webTitle} | News`
          }
        },
        {
          path: '/news/:id',
          name: 'news-detail',
          component: NewsPage,
          meta: {
            title: `${webTitle} | News`
          }
        },
        {
          path: 'games',
          name: 'games',
          component: GamesPage,
          meta: {
            title: `${webTitle} | Our Games`,
          },
        },

        {
          path: 'game',
          name: 'game',
          component: () => import('@pages/GamePage.vue'),
          meta: {
            title: webTitle,
          },
        },
        {
          path: '/error',
          name: 'error',
          component: () => import('@pages/ErrorPage.vue'),
          meta: {
            title: `${webTitle} | Error`,
          },
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: {
            name: 'error',
            query: {
              code: '404',
              message:
                'The page you are looking for does not exist, has been moved, or has never been here. Check the address or return to a known channel.',
            },
          },
        },
      ],
    },

    {
      path: '/admin',
      component: AdminLoginPage,
      children: [],
    },
  ],

  scrollBehavior,
})

router.beforeEach((to) => {
  document.title = typeof to.meta.title === 'string' ? to.meta.title : 'Page'
})

export function errorRedirection(code, message) {
  router.replace({
    path: '/error',
    query: {
      code,
      message,
    },
  })
}
export default router
