import Vue from 'vue'
import Router from 'vue-router'
import PostsList from '@/components/PostsList'
import About from '@/components/About'
import Post from '@/components/Post'

Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
