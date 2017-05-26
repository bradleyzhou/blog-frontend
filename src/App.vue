<template>
  <div id="blog-app">
    <page-nav></page-nav>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageNav from './components/PageNav'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  components: {
    'page-nav': PageNav,
    'page-footer': PageFooter
  }
}
</script>

<style>
body {
  margin: 0px;
}

#blog-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fbfcfd;
}
</style>
