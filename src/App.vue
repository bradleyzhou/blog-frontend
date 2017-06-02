<template>
  <div id="blog-app">
    <page-nav></page-nav>
    <div class="app-content"><router-view></router-view></div>
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
  color: #061535;
  background-color: #F7FCFA;
}

.app-content {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
}

h1 {
  text-align: center;
  font-size: 2.37em;
}

h2 {
  text-align: center;
  font-size: 1.77em;
}

h3 {
  font-size: 1.33em;
  margin-top: 1.33em;
}

p {
  font-size: 1.33em;
}
</style>
