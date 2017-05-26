<docs>
  A list of blog posts in their abstract.
</docs>

<template lang="html">
  <div class="posts-list">
    <post-abstract
      v-for="post in posts"
      :key="post.title"
      :post="post">
    </post-abstract>
    <div class="abstract-box load-more" v-if="next" @click="getPosts(next)">
      More Posts
    </div>
  </div>
</template>

<script>
import PostAbstract from './PostAbstract'

export default {
  name: 'post-list',

  components: {
    'post-abstract': PostAbstract
  },
  data () {
    return {
      'posts': [],
      'count': NaN,
      'next': '',
      'prev': ''
    }
  },

  methods: {
    getPosts: function (url = '/posts/') {
      return this.$http.get(url)
                .then((response) => {
                  this.posts.push.apply(this.posts, response.data.posts)
                  this.count = response.data.count
                  this.next = response.data.next
                  this.prev = response.data.prev
                })
    }
  },

  mounted: function () {
    this.getPosts()
  }
}
</script>

<style lang="css">
.posts-list {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.abstract-box {
  padding: 10px 15px 10px 15px;
  border-radius: 2px;
  box-shadow: 0 4px 16px -2px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.02);
  opacity: 0.8;
  background-color: #FEFEFA;
  transition: all 200ms ease-in-out;
}

.abstract-box:hover {
  opacity: 1;
}

.load-more {
  width: 100%;
  font-size: 115%;
  opacity: 0.75;
  cursor: pointer;
}

.load-more:hover {
  background-color: #F9F5D9;
}
</style>
