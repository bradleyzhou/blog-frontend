<docs>
  Editing existing post.
</docs>

<template lang="html">
  <div class="post-edit">
    <post-editor
      :oldTitle="old_title"
      :oldBody="old_body"
      @inputTitle="post_title = $event"
      @inputBody="post_body = $event"
    >
    </post-editor>
    <div class="editor-buttons">
      <button type="button" name="publish" @click="publish">Publish Changes</button>
      <button type="button" name="discard" @click="discard">Discard Changes</button>
    </div>
    <!-- <div class="test">
      <p>Outside:</p>
      <p>old_title: {{ old_title }}</p>
      <p>old_body: {{ old_body }}</p>
      <p>post_title: {{ post_title }}</p>
      <p>post_body: {{ post_body }}</p>
    </div> -->
  </div>
</template>

<script>
import PostEditor from './PostEditor'

export default {
  name: 'edit',

  components: {
    'post-editor': PostEditor
  },

  props: ['slug'],

  data () {
    return {
      api_url: '',
      old_title: '',
      old_body: '',
      post_title: '',
      post_body: ''
    }
  },

  methods: {
    getPost (url) {
      this.$http.get(url).then(
        (response) => {
          this.api_url = response.data.url
          this.old_title = response.data.title
          this.old_body = response.data.body
          if (this.old_title) {
            document.title = 'Edit - ' + this.old_title + ' - Bradley Zhou'
          }
        }
      )
    },

    initPost (slug = this.slug) {
      let url = '/posts/' + slug
      this.getPost(url)
    },

    isChanged () {
      return (this.old_title !== this.post_title) ||
             (this.old_body !== this.post_body)
    },

    publish () {
      if (!this.isChanged()) {
        console.log('not changed, do nothing')
        return
      }
      console.log('content changed? ' + this.isChanged())
      console.log('publish to ' + this.api_url)
      console.log('axios PUT')
    },

    discard () {
      if (!this.isChanged()) {
        console.log('not changed, do nothing')
        return
      }
      console.log('content changed ' + this.isChanged())
      console.log('discarding changes')

      // refresh the old_*, which is automatically propagated to child editor component
      let oldPost = {title: this.old_title, body: this.old_body}
      this.old_title = undefined
      this.old_body = undefined
      this.$nextTick(() => {
        this.old_title = oldPost.title
        this.old_body = oldPost.body
      })
    }
  },

  mounted () {
    this.initPost()
  }
}
</script>

<style lang="css">
</style>
