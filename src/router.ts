import Vue from 'vue';
import Router from 'vue-router';
import { AuthServer } from '@/auth';

import About from '@/views/About.vue';
import Edit from '@/views/Edit.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
import Post from '@/views/Post.vue';
import PostsList from '@/views/PostsList.vue';
import Write from '@/views/Write.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/',
      name: 'PostsList',
      component: PostsList,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/posts/:slug',
      name: 'Post',
      component: Post,
      props: true,
    },
    {
      path: '/edit/:slug',
      name: 'Edit',
      component: Edit,
      props: true,
      meta: { authRequired: true },
    },
    {
      path: '/write',
      alias: '/new',
      name: 'Write',
      component: Write,
      meta: { authRequired: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: (route) => ({ redirection: route.query.redirect }),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!AuthServer.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    // make sure to always call next()!
    next();
  }
});

export default router;
