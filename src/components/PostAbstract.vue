<docs>
  The post abstract component, shows a shorter version of a blog post. Can be grouped for displaying a list of blog posts.
</docs>

<template lang="html">
  <div class="post-abstract">
    <h2>{{ post.title }}</h2>
    <div class="abstract">{{ abstract }}</div>
    <div class="timestamp">Written at {{ post.timestamp }}</div>
    <div class="read-more">Read more</div>
  </div>
</template>

<script>
export default {
  name: 'post-abstract',
  props: ['post'],
  computed: {
    abstract: function () {
      let abstract = this.post.body.split('\n\n', 1)
      if (!abstract) {
        abstract = ''
      }
      return abstract[0]
    }
  }
}
</script>

<style lang="css">
.post-abstract {
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 4px 16px -2px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.02);
}

.post-abstract h2 {
}
</style>
