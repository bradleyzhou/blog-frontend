<docs>
  The post abstract component, shows a shorter version of a blog post. Can be grouped for displaying a list of blog posts.
</docs>

<template lang="html">
  <div class="post-abstract abstract-box">
    <h2>
      <router-link :to="{name: 'Post', params: {slug: slug}}">
        {{ post.title }}
      </router-link>
    </h2>
    <div class="timestamp">{{ timestamp }}</div>
    <div class="abstract">
      <router-link :to="{name: 'Post', params: {slug: slug}}">
        {{ abstract }}
      </router-link>
    </div>
    <div class="read-more">
      <router-link :to="{name: 'Post', params: {slug: slug}}">
        Read more »
      </router-link>
    </div>
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
    },
    slug: function () {
      let s = this.post.url.split('/')
      return s[s.length - 1]
    }
  }
}
</script>

<style lang="css">
.post-abstract {
  width: 100%;
  margin-bottom: 20px;
}

.post-abstract:last-child {
  margin-top: 0px;
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

.read-more {
  text-align: center;
  border-radius: 2px;
  margin-top: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  opacity: 0.5;
  transition: all 200ms ease-in-out;
}

.read-more:hover {
  opacity: 1.0;
  background-color: #F9F5D9;
}

.read-more a {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.read-more a:hover {
  text-decoration: none;
}
</style>
