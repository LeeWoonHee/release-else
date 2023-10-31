import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/store'
import axios from '@/axios'

Vue.use(Router)

const router = new Router({
                            mode: 'history',
                            base: process.env.BASE_URL,
                            scrollBehavior() {
                              return {
                                x: 0,
                                y: 0
                              }
                            },
                            routes: [
                              {
                                path     : '',
                                name     : 'home',
                                component: () => import('@/layouts/main/Main.vue'),
                                children : [
                                  {
                                    path     : '/',
                                    name     : 'index',
                                    component: () => import('@/views/pages/index.vue'),
                                  },
                                ]
                              },
                              {
                                path    : '*',
                                redirect: '/error-404'
                              }
                            ]
                          })

router.afterEach((to, from) => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
