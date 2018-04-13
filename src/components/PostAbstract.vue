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
    <div class="timestamp">{{ created_at }}</div>
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

<script lang="ts">
import moment from 'moment';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IPost } from '@/views/Post.vue';

@Component
export default class PostAbstract extends Vue {
  @Prop({ default: {
    title: '',
    body: '',
    url: '',
    created_at: '',
  } as IPost })
  public post!: IPost;

  public get abstract() {
    let abstract = this.post.body.split('\n', 1);
    if (!abstract) {
      abstract = [''];
    }
    return abstract[0];
  }

  public get created_at() {
    return moment(this.post.created_at)
                 .format('MMM D YYYY');
  }

  public get slug() {
    const s = this.post.url.split('/');
    return s[s.length - 1];
  }
}
</script>

<style lang="scss">
.post-abstract {
  width: 100%;
  margin-bottom: 20px;

  &:last-child {
    margin-top: 0px;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    text-align: left;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .timestamp {
    text-align: left;
    margin-bottom: 15px;
  }

  .abstract {
    text-align: left;
  }
}

.read-more {
  text-align: center;
  border-radius: 2px;
  margin-top: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  opacity: 0.5;
  transition: all 200ms ease-in-out;

  &:hover {
    opacity: 1.0;
    background-color: #F9F5D9;
  }

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
