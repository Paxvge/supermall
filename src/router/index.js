import { createRouter, createWebHistory } from 'vue-router'

// 懒加载
const Home = () => import('@/views/home/Home');
const Category = () => import('@/views/category/Category');
const Cart = () => import('@/views/cart/Cart');
const Profile = () => import('@/views/profile/Profile');
const Detail = () => import('@/views/detail/Detail')

// 创建路由对象
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: Detail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
