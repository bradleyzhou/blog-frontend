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
      :feedingTitle="feeding_title"
      :feedingBody="feeding_body"
      @title-changed="post_title = $event"
      @body-changed="post_body = $event"
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
      feeding_title: '',
      feeding_body: '',
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
      this.saveDraft()
    },

    saveDraft () {
      // save draft to localStorage
      this.flashNotice('Saving draft to local storage')
      localStorage.setItem('draft_title', this.post_title)
      localStorage.setItem('draft_body', this.post_body)
    },

    loadDraft () {
      // load draft from localStorage
      let title = localStorage.getItem('draft_title')
      let body = localStorage.getItem('draft_body')
      if (!title && !body) {
        return
      }
      this.flashNotice('Loading draft from local storage')
      this.feeding_title = title
      this.feeding_body = body
    },

    deleteDraft () {
      // remove draft from localStorage
      this.flashNotice('Deleting draft in local storage')
      localStorage.removeItem('draft_title')
      localStorage.removeItem('draft_body')
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

    getSlug (url) {
      let paths = url.split('/posts/')
      return paths[paths.length - 1]
    },

    confirmPublish () {
      this.showPublishModal = false
      this.saveDraft()
      let token = this.$auth.getToken()
      if (!token) {
        this.flashNotice('No valid credentials found. Refresh page to login.')
        return
      }
      this.$http({
        method: 'post',
        url: '/posts/',
        auth: {
          username: token,
          password: ''
        },
        data: {
          title: this.post_title,
          body: this.post_body
        }
      })
        .then((response) => {
          let slug = this.getSlug(response.data.url)
          this.$emit('publish-success', slug)
        })
        .catch((err) => {
          this.$emit('publish-error', err)
          console.log(err)
        })
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
      this.feeding_title = undefined
      this.feeding_body = undefined
      this.$nextTick(() => {
        this.feeding_title = ''
        this.feeding_body = ''
      })
      this.showDiscardModal = false
    },

    cancelDiscard () {
      this.showDiscardModal = false
    }
  },

  mounted () {
    this.$on('publish-success', (slug) => {
      this.deleteDraft()
      this.$router.push({name: 'Post', params: { slug: slug }})
    })
    document.title = 'Write A New Post - Bradley Zhou'
    this.loadDraft()
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
