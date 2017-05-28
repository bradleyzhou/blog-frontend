<docs>
  Writing a new post.
</docs>

<template lang="html">
  <div class="post-write">
    <post-editor
      :oldTitle="old_title"
      :oldBody="old_body"
      @inputTitle="post_title = $event"
      @inputBody="post_body = $event"
    >
    </post-editor>
    <div class="editor-buttons">
      <button type="button" name="save" @click="save">Save Draft</button>
      <button type="button" name="publish" @click="publish">Publish</button>
      <button type="button" name="discard" @click="discard">Discard</button>
    </div>
    <div class="test">
      <p>Outside:</p>
      <p>post_title: {{ post_title }}</p>
      <p>post_body: {{ post_body }}</p>
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
      old_title: '',
      old_body: '',
      post_title: '',
      post_body: ''
    }
  },

  methods: {
    isChanged () {
      return (this.post_title !== '') ||
             (this.post_body !== '')
    },

    save () {
      if (!this.isChanged()) {
        console.log('not changed, do nothing')
        return
      }
      console.log('saving draft')
      console.log('axios POST')
      console.log('register redirect to edit in axios')
    },

    publish () {
      if (!this.isChanged()) {
        console.log('not changed, do nothing')
        return
      }
      console.log('publishing')
      console.log('confirm?')
      console.log('axios POST')
      console.log('register redirect to view post in axios')
    },

    discard () {
      if (!this.isChanged()) {
        console.log('not changed, do nothing')
        return
      }
      console.log('discarding changes')
      console.log('confirm?')
      this.old_title = undefined
      this.old_body = undefined
      this.$nextTick(() => {
        this.old_title = ''
        this.old_body = ''
      })
    }
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
