<docs>
  Editing existing post.
</docs>

<template lang="html">
  <div class="post-edit">
    <post-editor
      :="slug"
      @inputTitle="post_title = $event"
      @inputBody="post_body = $event"
    >
    </post-editor>
    <div class="editor-buttons">
      <button type="button" name="publish">Publish Changes</button>
      <button type="button" name="discard">Discard</button>
    </div>
  </div>
</template>

<script>
import PostEditor from './PostEditor'

export default {
  name: 'edit',

  components: {
    'post-editor': PostEditor
  },

  data () {
    return {
      slug: '',
      post_title: 'Title',
      post_body: 'What do you like to share?'
    }
  },

  methods: {
    getPost (slug) {
      let url = '/posts/' + slug
      this.$http.get(url).then(
        (response) => {
          this.post = response.data
          if (this.post.title) {
            document.title = 'Edit - ' + this.post.title + ' - Bradley Zhou'
          }
        }
      )
    }
  }
}
</script>

<style lang="css">
</style>
