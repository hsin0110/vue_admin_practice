
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
        title: '',
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
    {
      path: '/screen',
      component: () => import('@/views/screen/index.vue'),
      name: 'Screen',
      meta: {
        title: '數據大坪',
        isShow: true,
        icon: 'Platform'
      }
  },
    {
      path: '/acl',
      component: () => import('@/layout/index.vue'),
      name: 'Acl',
      meta: {
        title: '權限管理',
        isShow: true,
        icon: 'Lock'
      },
      redirect:'/acl/user',
      children: [
        {
          path: '/acl/user',
          component: () => import('@/views/acl/user/index.vue'),
          name: 'Acl',
          meta: {
            title: '用戶管理',
            isShow: true,
            icon:'User'
          }
        },
        {
          path: '/acl/role',
          component: () => import('@/views/acl/role/index.vue'),
          name: 'Role',
          meta: {
            title: '角色管理',
            isShow: true,
            icon:'UserFilled'
          }
        },
        {
          path: '/acl/permission',
          component: () => import('@/views/acl/permission/index.vue'),
          name: 'Permission',
          meta: {
            title: '菜單管理',
            isShow: true,
            icon:'Monitor'
          }
        }
      ]
    },
    {
      path: '/product',
      component: () => import('@/layout/index.vue'),
      name: 'Product',
      meta: {
        title: '商品管理',
        isShow: true,
        icon: 'Goods'
      },
      redirect:'/product/trademark',
      children: [
        {
          path: '/product/trademark',
          component: () => import('@/views/product/trademark/index.vue'),
          name: 'Trademark',
          meta: {
            title: '品牌管理',
            isShow: true,
            icon:'ShoppingCartFull'
          }
        },
        {
          path: '/product/attr',
          component: () => import('@/views/product/attr/index.vue'),
          name: 'Attr',
          meta: {
            title: '屬性管理',
            isShow: true,
            icon:'ChromeFilled'
          }
        },
        {
          path: '/product/spu',
          component: () => import('@/views/product/spu/index.vue'),
          name: 'Spu',
          meta: {
            title: 'Spu管理',
            isShow: true,
            icon:'Calendar'
          }
        },
        {
          path: '/product/sku',
          component: () => import('@/views/product/sku/index.vue'),
          name: 'Sku',
          meta: {
            title: 'Sku管理',
            isShow: true,
            icon:'Orange'
          }
        }
      ]
    }
  
]