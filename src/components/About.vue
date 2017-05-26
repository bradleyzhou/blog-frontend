<docs>
  The "About" page.
</docs>

<template lang="html">
  <div class="about">
    <div class="about-html" v-html="about_html"></div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      title: 'About Bradley Zhou'
    }
  },
  computed: {
    about_html: function () {
      let about = `
# About this site

I am Bradley and this is my personal blog. Every now and then I would write about my learnings and thoughts on software development. Welcome :D

This site is written by me. I used Flask for backend RESTful API, Vue.js for frontend, and NGINX for serving web requests. These services are deployed using Docker containers managed by docker-compose.

# About me

I was a neuroscientist by training, and I am now transitioning to software development. I had a great time in asking questions and solving problems during my PhD research on learning and memory and neuro-circuitry of fruit flys (and yes puny fruit flys can learning things and have brains in their heads). But I have always been enthusiastic in computers and programming, whether it be setting up a linux-based file-sharing server or writing software for data analysis. It is always a pleasure when you (finally) make computers do what you told them.

I hope you find my site useful, or at least interesting. You can find me at [GitHub](https://github.com/bradleyzhou), or drop me a line to bradley at bradleyzhou.com.
      `
      return this.$md.render(about)
    }
  },
  mounted: function () {
    document.title = this.title
  }
}
</script>

<style lang="css">
.about p {
  text-align: left;
}
</style>
