import Vue from 'vue'
import Router from 'vue-router'
import PostsList from '@/components/PostsList'
import About from '@/components/About'
import Post from '@/components/Post'
import Edit from '@/components/Edit'
import Write from '@/components/Write'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'PostsList',
      component: PostsList
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/posts/:slug',
      name: 'Post',
      component: Post
    },
    {
      path: '/edit/:slug',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/write',
      alias: '/new',
      name: 'Write',
      component: Write
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
