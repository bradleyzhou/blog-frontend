<docs>
  Writing a new post.
</docs>

<template lang="html">
  <div class="post-write">
    <post-editor
      @inputTitle="post_title = $event"
      @inputBody="post_body = $event"
    >
    </post-editor>
    <div class="editor-buttons">
      <button type="button" name="save">Save Draft</button>
      <button type="button" name="publish">Publish</button>
      <button type="button" name="discard">Discard</button>
    </div>
    <div class="test">
      <h1>{{ post_title }}</h1>
      {{ post_body }}
    </div>
  </div>
</template>

<script>
import PostEditor from './PostEditor'

export default {
  name: 'write',
  components: {
    'post-editor': PostEditor
  },
  data () {
    return {
      post_title: '',
      post_body: ''
    }
  },
  methods: {
  },
  mounted () {
    document.title = 'Write A New Post - Bradley Zhou'
  }
}
</script>

<style lang="css">
.post-write {
  width: 100%;
}
</style>
