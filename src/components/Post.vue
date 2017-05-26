<docs>
  The post content page, shows a single blog-post.
</docs>

<template lang="html">
  <div class="blog-post">
    <h1>{{ post.title }}</h1>
    <div class="timestamp">Posted at {{ timestamp }}</div>
    <div class="post-html" v-html="post_html"></div>
  </div>
</template>

<script>
export default {
  name: 'post',
  data () {
    return {
      post: {
        body: ''
      }
    }
  },
  computed: {
    post_html: function () {
      return this.$md.render(this.post.body)
    },
    timestamp: function () {
      return this.$moment(this.post.timestamp)
                 .format('MMM D YYYY')
    }
  },
  methods: {
    getPost: function (slug = this.$route.params.slug) {
      let url = '/posts/' + slug
      this.$http.get(url).then(
        (response) => { this.post = response.data }
      )
    }
  },
  mounted: function () {
    this.getPost()
  }
}
</script>

<style lang="css">
.blog-post {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.blog-post .timestamp {
  /*font-size: 75%;*/
}

.post-html {
  text-align: left;
  font-size: 125%;
}

.post-html p {

}
</style>
