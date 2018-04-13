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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PostAbstract from '@/components/PostAbstract.vue';

@Component({
  components: {
    'post-abstract': PostAbstract,
  },
})
export default class PostList extends Vue {
  public title = 'Blog Posts by Bradley Zhou';
  public posts = [];
  public count = Number.NaN;
  public next = '';
  public prev = '';

  public getPosts(url = '/posts/') {
    return this.$http.get(url)
              .then((response) => {
                this.posts.push.apply(this.posts, response.data.posts);
                this.count = response.data.count;
                this.next = response.data.next;
                this.prev = response.data.prev;
              });
  }

  private mounted() {
    document.title = this.title;
    this.getPosts();
  }
}
</script>

<style lang="scss">
.posts-list {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.abstract-box {
  padding: 10px 15px 10px 15px;
  border-radius: 2px;
  box-shadow: 0 4px 16px -2px rgba(0,0,0,.1), 0 0 0 1px rgba(0,0,0,.02);
  opacity: 0.8;
  background-color: #FEFEFA;
  transition: all 200ms ease-in-out;

  &:hover {
    opacity: 1;
  }
}

.load-more {
  width: 100%;
  font-size: 115%;
  opacity: 0.75;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #F9F5D9;
  }
}
</style>
