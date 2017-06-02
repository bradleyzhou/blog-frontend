<docs>
  Editing a blog post. This component fetches and stores original post content into 'old_title' and 'old_body'. It feeds post content to post-editor child component via 'feeding_title' and 'feeding_title'. It receives the edited 'post_title' and 'post_body' from post-editor's 'title-changed' and 'body-changed' events. When initializing, this component will check localStorage for drafts saved just befor publishing, and load when there is one.
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
      :feedingTitle="feeding_title"
      :feedingBody="feeding_body"
      @title-changed="post_title = $event"
      @body-changed="post_body = $event"
    >
    </post-editor>
    <div class="editor-buttons">
      <button name="publish" @click="tryPublish">Publish Changes</button>
      <button name="discard" @click="tryDiscard">Discard Changes</button>
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

    loadPost (slug = this.slug) {
      let url = '/posts/' + slug
      this.$http.get(url).then(
        (response) => {
          this.api_url = response.data.url
          this.old_title = response.data.title
          this.old_body = response.data.body
          if (this.old_title) {
            document.title = 'Edit - ' + this.old_title + ' - Bradley Zhou'
          }
          this.$emit('old-post-loaded', 'Old post has been stored in old_title and old_body')
        }
      )
    },

    isChanged () {
      return (this.old_title !== this.post_title) ||
             (this.old_body !== this.post_body)
    },

    isPostValid () {
      return (this.post_title !== '') &&
             (this.post_body !== '')
    },

    saveEditDraft () {
      // save edit draft to localStorage
      this.flashNotice('Saving edit draft to local storage')
      localStorage.setItem('edit_draft_title', this.post_title)
      localStorage.setItem('edit_draft_body', this.post_body)
    },

    loadEditDraft () {
      // load edit draft from localStorage, if no draft load old post
      let title = localStorage.getItem('edit_draft_title')
      let body = localStorage.getItem('edit_draft_body')
      if (!title || !body) {
        this.feeding_title = this.old_title
        this.feeding_body = this.old_body
        return
      }
      this.flashNotice('Loading edit draft from local storage')
      this.feeding_title = title
      this.feeding_body = body
    },

    deleteEditDraft () {
      // remove edit_draft from localStorage
      this.flashNotice('Deleting edit draft in local storage')
      localStorage.removeItem('edit_draft_title')
      localStorage.removeItem('edit_draft_body')
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
      this.saveEditDraft()
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
      // revert editor title and body to original old_title and old_body
      this.feeding_title = undefined
      this.feeding_body = undefined
      this.$nextTick(() => {
        this.feeding_title = this.old_title
        this.feeding_body = this.old_body
      })
      this.showDiscardModal = false
    },

    cancelDiscard () {
      this.showDiscardModal = false
    }
  },

  mounted () {
    this.loadPost()
    this.$on('old-post-loaded', () => {
      this.loadEditDraft()
    })
    this.$on('publish-success', (slug) => {
      this.deleteEditDraft()
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
