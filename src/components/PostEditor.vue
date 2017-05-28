<docs>
  A markdown editor for posts. Accepts 'oldTitle' and 'oldBody' strings for editing, emits 'inputTitle' and 'inputBody' when these value changes.
</docs>

<template lang="html">
  <div class="post-editor">
    <div class="title-editor">
      <textarea class="post-title"
        ref="title_editor" placeholder="Enter Post Title Here"
        :value="title" @input="changeTitle"
      >
      </textarea>
    </div>
    <div class="body-editor">
      <textarea class="post-body"
        ref="body_editor" placeholder="Enter Post Content Here"
      >
      </textarea>
    </div>
    <!-- <span>{{ changed }}</span>
    <h1>{{ title }}</h1> -->
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
    initBodyEditor () {
      let mdeConfig = {
        element: this.$refs.body_editor
      }
      require('simplemde/dist/simplemde.min.css')
      this.mdeB = new SimpleMDE(mdeConfig)
      this.mdeB.value(this.oldBody)
      this.mdeB.codemirror.on('change', () => {
        this.$emit('inputBody', this.mdeB.value())
      })
    },
    changeTitle (event) {
      let title = event.target.value
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
    this.initBodyEditor()
  },

  beforeDestroy () {
    this.mdeB.toTextArea()
    this.mdeB = null
  },

  watch: {
    body (newVal) {
      this.mdeB.value(newVal)
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
	/*min-height: 20px;*/
  font-size: 1.77em;
  text-align: center;
  resize: none;
  outline: none;
  border-radius: 4px;
  border-color: #bbb;
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
