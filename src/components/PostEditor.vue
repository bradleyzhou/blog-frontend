<docs>
  A markdown editor for posts. Accepts 'oldTitle' and 'oldBody' strings for editing, emits 'inputTitle' and 'inputBody' when these value changes, and keeps local data-bindings in 'title' and 'post'.
</docs>

<template lang="html">
  <div class="post-editor">
    <div class="title-editor">
      <textarea class="post-title"
        ref="title_editor" placeholder="Enter Post Title Here"
        :value="title" @input="changeTitle($event.target.value)"
      >
      </textarea>
    </div>
    <div class="body-editor">
      <textarea class="post-body"
        ref="body_editor" placeholder="Enter Post Content Here"
      >
      </textarea>
    </div>
    <!-- <div class="test">
      <p>Within editor:</p>
      <p>oldTitle: {{ oldTitle }}</p>
      <p>oldBody: {{ oldBody }}</p>
      <p>title: {{ title }}</p>
      <p>body: {{ body }}</p>
    </div> -->
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'

export default {
  name: 'post-editor',

  props: ['oldTitle', 'oldBody'],

  data () {
    return {
      title: '',
      body: '',
      changed: false
    }
  },

  methods: {
    initTitleEditor () {
      this.title = this.oldTitle
    },

    initBodyEditor () {
      let mdeConfig = {
        element: this.$refs.body_editor
      }
      require('simplemde/dist/simplemde.min.css')
      this.mdeB = new SimpleMDE(mdeConfig)
      this.mdeB.value(this.oldBody)

      // register changed body
      this.mdeB.codemirror.on('change', () => {
        this.body = this.mdeB.value()
        this.$emit('inputBody', this.mdeB.value())
      })
    },

    changeTitle (title) {
      if (!title) {
        return
      }
      // no new-lines in title
      this.title = title.replace(/(?:\r\n|\r|\n)/g, ' ')
      this.$emit('inputTitle', this.title)

      // auto-resize textarea
      let titleEl = this.$refs.title_editor
      titleEl.style.height = 'auto'
      titleEl.style.height = titleEl.scrollHeight + 'px'
    }
  },

  mounted () {
    this.initTitleEditor()
    this.initBodyEditor()
  },

  beforeDestroy () {
    this.mdeB.toTextArea()
    this.mdeB = null
  },

  watch: {
    oldTitle (updatedTitle) {
      // This should be called when parent component finishes asynchronous data fetching
      this.title = updatedTitle
    },
    oldBody (updatedBody) {
      // This should be called when parent component finishes asynchronous data fetching
      this.body = updatedBody
      // Push changes to SimpleMDE editor
      this.mdeB.value(this.oldBody)
    },
    title (updatedTitle) {
      this.changeTitle(updatedTitle)
    }
  }
}
</script>

<style lang="css">
.title-editor {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.title-editor textarea {
  box-sizing: border-box;
  width: 100%;
  font-size: 1.77em;
  text-align: center;
  resize: none;
  outline: none;
  border-radius: 4px;
  border-color: #ddd;
  overflow-y: hidden;
  transition: all 200ms ease-in-out;
}

.body-editor {
  width: 100%;
}

.editor-buttons {
  display: flex;
  justify-content: flex-end;
}

.editor-buttons button {
  font-size: 0.75em;
  margin: auto 5px auto 5px;
}
</style>
