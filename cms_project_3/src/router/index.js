import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Member from '@/components/Member/Member'
import Search from '@/components/Search/Search'
import Shopcart from '@/components/Shopcart/Shopcart'
import NewsList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/Photo/PhotoList'
import PhotoDetail from '@/components/Photo/PhotoDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:{name:'Home'}//redirect:'/Home'相同
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Member',
      name: 'Member',
      component: Member
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Shopcart',
      name: 'Shopcart',
      component: Shopcart
    },
    {
      path:'/news/list',
      name:'news.list',
      component:NewsList
    },
    {
      path:'/news/detail',
      name:'news.detail',
      component:NewsDetail
    },
    {
      path:'/photo/list/:categoryId',
      name:'photo.list',
      component:PhotoList
    },
    {
      path:'/photo/detail/:id',
      name:'photo.detail',
      component:PhotoDetail
    }
  ],
  scrollBehavior(to,from,savedPosition){
    return {x:0,y:0}
  }
})
