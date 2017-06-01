<docs>
  Writing a new post.
</docs>

<template lang="html">
  <div class="post-write">
    <post-confirm-modal v-if="showPublishModal">
      <h3 slot="header">Confirm Publish</h3>
      <p slot="body">Save the blog post and make it public?</p>
      <button slot="footer" class="modal-default-button"
        @click="confirmPublish"
      >
        Save and Publish
      </button>
      <button slot="footer" class="modal-default-button"
        @click="cancelPublish"
      >
        No, I'll write more
      </button>
    </post-confirm-modal>
    <post-confirm-modal v-if="showDiscardModal">
      <h3 slot="header">Confirm Discard</h3>
      <p slot="body">Throw away all your contents?</p>
      <button slot="footer" class="modal-default-button"
        @click="confirmDiscard"
      >
        Destroy All
      </button>
      <button slot="footer" class="modal-default-button"
        @click="cancelDiscard"
      >
        No, keep my contents
      </button>
    </post-confirm-modal>
    <post-editor
      :oldTitle="old_title"
      :oldBody="old_body"
      @inputTitle="post_title = $event"
      @inputBody="post_body = $event"
    >
    </post-editor>
    <div class="editor-buttons">
      <button name="save" @click="trySave">Save Draft</button>
      <button name="publish" @click="tryPublish">Publish</button>
      <button name="discard" @click="tryDiscard">Discard</button>
    </div>
    <transition name="notice">
      <p v-if="notice" class="notice">{{ notice }}</p>
    </transition>
    <!-- <div class="test">
      <p>Outside:</p>
      <p>post_title: {{ post_title }}</p>
      <p>post_body: {{ post_body }}</p>
    </div> -->
  </div>
</template>

<script>
import PostEditor from './PostEditor'
import PostConfirmModal from './PostConfirmModal'

export default {
  name: 'write',

  components: {
    'post-editor': PostEditor,
    'post-confirm-modal': PostConfirmModal
  },

  data () {
    return {
      old_title: '',
      old_body: '',
      post_title: '',
      post_body: '',
      notice: '',
      showPublishModal: false,
      showDiscardModal: false
    }
  },

  methods: {
    flashNotice (messege, duration = 5000) {
      this.notice = messege
      setTimeout(() => { this.notice = '' }, duration)
    },

    isChanged () {
      return (this.post_title !== '') ||
             (this.post_body !== '')
    },

    isPostValid () {
      return (this.post_title !== '') &&
             (this.post_body !== '')
    },

    trySave () {
      if (!this.isChanged()) {
        this.flashNotice('Post not changed, do nothing')
        return
      } else if (!this.isPostValid()) {
        this.flashNotice('Invalid Post title or body')
        return
      }
      this.notice = ''
      console.log('saving draft')
      console.log('axios POST')
      console.log('register redirect to edit in axios')
    },

    tryPublish () {
      if (!this.isChanged()) {
        this.flashNotice('Post not changed, do nothing')
        return
      } else if (!this.isPostValid()) {
        this.flashNotice('Invalid Post title or body')
        return
      }
      this.notice = ''
      this.showPublishModal = true
    },

    confirmPublish () {
      this.showPublishModal = false
      console.log('axios POST')
      console.log('register redirect to view post in axios')
    },

    cancelPublish () {
      this.showPublishModal = false
    },

    tryDiscard () {
      if (!this.isChanged()) {
        this.flashNotice('Post not changed, do nothing')
        return
      }
      this.notice = ''
      this.showDiscardModal = true
    },

    confirmDiscard () {
      this.old_title = undefined
      this.old_body = undefined
      this.$nextTick(() => {
        this.old_title = ''
        this.old_body = ''
      })
      this.showDiscardModal = false
    },

    cancelDiscard () {
      this.showDiscardModal = false
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

.notice {
  text-align: center;
  font-size: 0.75em;
  background-color: #F9F5D9;
}

.notice-enter-active, .notice-leave-active {
  transition: all .3s ease;
}

.notice-enter, .notice-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
