<docs>
  The post content page, shows a single blog-post.
</docs>

<template lang="html">
  <div class="blog-post">
    <h1>{{ post.title }}</h1>
    <div class="timestamp">Publised at {{ created_at }}</div>
    <div class="post-buttons" v-if="$auth.authenticated">
      <button class="edit"
        @click="$router.push({name: 'Edit', params: { slug: slug }})"
      >
        Edit
      </button>
    </div>
    <div class="post-html" v-html="post_html"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

export interface IPost {
  title: string;
  body: string;
  created_at: string;
  url: string;
}

@Component
export default class Post extends Vue {
  @Prop({ default: '' })
  public slug!: string;

  public title = 'Bradley Zhou';
  public post: IPost = {
    title: '',
    body: '',
    created_at: '',
    url: '',
  };

  public get post_html() {
    return this.$md.render(this.post.body);
  }

  public get created_at() {
    return moment(this.post.created_at)
                 .format('MMM D YYYY');
  }

  private getPost(slug = this.slug) {
    const url = '/posts/' + slug;
    this.$http.get(url).then(
      (response) => {
        this.post = response.data;
        if (this.post.title) {
          this.title = this.post.title + ' - Bradley Zhou';
        }
        document.title = this.title;
    });
  }

  private mounted() {
    this.getPost();
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

.post-buttons {
  display: flex;
  justify-content: center;
}

.post-html {
  font-size: 115%;
}
</style>
