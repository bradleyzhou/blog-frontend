import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'
import PostsList from '@/components/PostsList'
import About from '@/components/About'
import Post from '@/components/Post'
import Edit from '@/components/Edit'
import Write from '@/components/Write'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
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
      component: Post,
      props: true
    },
    {
      path: '/edit/:slug',
      name: 'Edit',
      component: Edit,
      props: true,
      meta: { authRequired: true }
    },
    {
      path: '/write',
      alias: '/new',
      name: 'Write',
      component: Write,
      meta: { authRequired: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: (route) => ({ redirection: route.query.redirect })
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
