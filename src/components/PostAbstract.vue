<docs>
  The post abstract component, shows a shorter version of a blog post. Can be grouped for displaying a list of blog posts.
</docs>

<template lang="html">
  <div class="post-abstract">
    <h2><a :href="post.url">{{ post.title }}</a></h2>
    <div class="timestamp">{{ timestamp }}</div>
    <div class="abstract"><a :href="post.url">{{ abstract }}</a></div>
    <div class="read-more"><a :href="post.url">Read more »</a></div>
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
    },
    timestamp: function () {
      return this.$moment(this.post.timestamp)
                 .format('MMM D YYYY')
    }
  }
}
</script>

<style lang="css">
.post-abstract {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 2px;
  padding: 10px 15px 10px 15px;
  box-shadow: 0 4px 16px -2px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.02);
}

.post-abstract:first-child {
  margin-top: 20px;
}

.post-abstract a {
  text-decoration: none;
  color: inherit;
}

.post-abstract a:hover {
  text-decoration: underline;
}

.post-abstract h2 {
  text-align: left;
  margin-top: 0px;
  margin-bottom: 0px;
}

.post-abstract .timestamp {
  text-align: left;
  margin-bottom: 15px;
}

.post-abstract .abstract {
  text-align: left;
}

.post-abstract .read-more {
  margin-top: 15px;
  opacity: 0.5;
}
</style>
