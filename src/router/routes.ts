// 
export const constantRoute = [
  // login
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登入',
      isShow: false
    }
    },
    // home
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      name: 'layout',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首頁',
            isShow: true,
            icon: 'HomeFilled'
          }
        },
        // {
        //   path: '/ceshi',
        //   component: () => import('@/views/home/index.vue'),
        //   meta: {
        //     title: '測試',
        //     isShow: true,
        //     icon: 'Promotion'
        //   }
        // }
      ],
      meta: {
        title: 'Layout',
        isShow: true,
        icon: 'Promotion'
      }
    },
    // 404
    {
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      name:'404',
      meta: {
        title: '404',
        isShow: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'Any',
      meta: {
        title: '任意路由',
        isShow: false
      }
    },
  
]