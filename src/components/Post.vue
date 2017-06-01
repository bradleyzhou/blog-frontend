<docs>
  The post content page, shows a single blog-post.
</docs>

<template lang="html">
  <div class="blog-post">
    <h1>{{ post.title }}</h1>
    <div class="timestamp">Publised at {{ created_at }}</div>
    <div class="editor-buttons" v-if="$auth.authenticated">
      <button class="edit"
        @click="$router.push({name: 'Edit', params: { slug: slug }})"
      >
        Edit
      </button>
    </div>
    <div class="post-html" v-html="post_html"></div>
  </div>
</template>

<script>
export default {
  name: 'post',
  props: ['slug'],
  data () {
    return {
      title: 'Bradley Zhou',
      post: {
        body: ''
      }
    }
  },
  computed: {
    post_html: function () {
      return this.$md.render(this.post.body)
    },
    created_at: function () {
      return this.$moment(this.post.created_at)
                 .format('MMM D YYYY')
    }
  },
  methods: {
    getPost: function (slug = this.slug) {
      let url = '/posts/' + slug
      this.$http.get(url).then(
        (response) => {
          this.post = response.data
          if (this.post.title) {
            this.title = this.post.title + ' - Bradley Zhou'
          }
          document.title = this.title
        }
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
  text-align: center;
}

.post-html {
  font-size: 115%;
}
</style>
