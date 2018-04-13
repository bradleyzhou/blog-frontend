<template>
  <div id="blog-app">
    <page-nav></page-nav>
    <div class="app-content"><router-view></router-view></div>
    <page-footer></page-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PageNav from '@/components/PageNav.vue';
import PageFooter from '@/components/PageFooter.vue';

@Component({
  components: {
    'page-nav': PageNav,
    'page-footer': PageFooter,
  },
})
export default class BlogApp extends Vue {
}
</script>

<style lang="scss">
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
