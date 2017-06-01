<docs>
  Editing existing post.
</docs>

<template lang="html">
  <div class="post-edit">
    <post-confirm-modal v-if="showPublishModal">
      <h3 slot="header">Confirm Publish</h3>
      <p slot="body">Save the edits and republish?</p>
      <button slot="footer" class="modal-default-button"
        @click="confirmPublish"
      >
        Save and Publish
      </button>
      <button slot="footer" class="modal-default-button"
        @click="cancelPublish"
      >
        No, I'll edit more
      </button>
    </post-confirm-modal>
    <post-confirm-modal v-if="showDiscardModal">
      <h3 slot="header">Confirm Discard</h3>
      <p slot="body">Throw away all edits and revert to original post?</p>
      <button slot="footer" class="modal-default-button"
        @click="confirmDiscard"
      >
        Discard all edits
      </button>
      <button slot="footer" class="modal-default-button"
        @click="cancelDiscard"
      >
        No, keep editing
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
      <button type="button" name="publish" @click="tryPublish">Publish Changes</button>
      <button type="button" name="discard" @click="tryDiscard">Discard Changes</button>
    </div>
    <transition name="notice">
      <p v-if="notice" class="notice">{{ notice }}</p>
    </transition>
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
import PostConfirmModal from './PostConfirmModal'

export default {
  name: 'edit',

  components: {
    'post-editor': PostEditor,
    'post-confirm-modal': PostConfirmModal
  },

  props: ['slug'],

  data () {
    return {
      api_url: '',
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

    isPostValid () {
      return (this.post_title !== '') &&
             (this.post_body !== '')
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
      let token = this.$auth.getToken()
      if (!token) {
        this.flashNotice('No valid credentials found. Refresh page to login.')
        return
      }
      this.$http({
        method: 'put',
        url: '/posts/' + this.slug,
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
      // refresh the old_*, which is automatically propagated to child editor component
      let oldPost = {title: this.old_title, body: this.old_body}
      this.old_title = undefined
      this.old_body = undefined
      this.$nextTick(() => {
        this.old_title = oldPost.title
        this.old_body = oldPost.body
      })
      this.showDiscardModal = false
    },

    cancelDiscard () {
      this.showDiscardModal = false
    }
  },

  mounted () {
    this.initPost()
    this.$on('publish-success', (slug) => {
      this.$router.push({name: 'Post', params: { slug: slug }})
    })
  }
}
</script>

<style lang="css">
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
