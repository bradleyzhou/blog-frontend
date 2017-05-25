<docs>
  The post abstract component, shows a shorter version of a blog post. Can be grouped for displaying a list of blog posts.
</docs>

<template lang="html">
  <div class="post-abstract">
    <h2>{{ post.title }}</h2>
    <span>By {{ post.author }}. Written at {{ post.timestamp }}</span>
    {{ post.body_html }}
    <span>Read more</span>
  </div>
</template>

<script>
export default {
  name: 'post-abstract',
  props: ['post']
}
</script>

<style lang="css">
</style>
