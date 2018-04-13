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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import PostEditor from '@/components/PostEditor.vue';
import PostConfirmModal from '@/components/PostConfirmModal.vue';

@Component({
  components: {
    'post-editor': PostEditor,
    'post-confirm-modal': PostConfirmModal,
  },
})
export default class Write extends Vue {
  public feeding_title: string | null = '';
  public feeding_body: string | null = '';
  public post_title = '';
  public post_body = '';
  public notice = '';
  public showPublishModal = false;
  public showDiscardModal = false;

  private flashNotice(messege: string, duration = 5000) {
    this.notice = messege;
    setTimeout(() => { this.notice = ''; }, duration);
  }

  private isChanged() {
    return (this.post_title !== '') ||
            (this.post_body !== '');
  }

  private isPostValid() {
    return (this.post_title !== '') &&
            (this.post_body !== '');
  }

  public trySave() {
    if (!this.isChanged()) {
      this.flashNotice('Post not changed, do nothing');
      return;
    } else if (!this.isPostValid()) {
      this.flashNotice('Invalid Post title or body');
      return;
    }
    this.notice = '';
    this.saveDraft();
  }

  private saveDraft() {
    // save draft to localStorage
    this.flashNotice('Saving draft to local storage');
    localStorage.setItem('draft_title', this.post_title);
    localStorage.setItem('draft_body', this.post_body);
  }

  private loadDraft() {
    // load draft from localStorage
    const title = localStorage.getItem('draft_title');
    const body = localStorage.getItem('draft_body');
    if (!title && !body) {
      return;
    }
    this.flashNotice('Loading draft from local storage');
    this.feeding_title = title;
    this.feeding_body = body;
  }

  private deleteDraft() {
    // remove draft from localStorage
    this.flashNotice('Deleting draft in local storage');
    localStorage.removeItem('draft_title');
    localStorage.removeItem('draft_body');
  }

  public tryPublish() {
    if (!this.isChanged()) {
      this.flashNotice('Post not changed, do nothing');
      return;
    } else if (!this.isPostValid()) {
      this.flashNotice('Invalid Post title or body');
      return;
    }
    this.notice = '';
    this.showPublishModal = true;
  }

  private getSlug(url: string) {
    const paths = url.split('/posts/');
    return paths[paths.length - 1];
  }

  public confirmPublish() {
    this.showPublishModal = false;
    this.saveDraft();
    const token = this.$auth.getToken();
    if (!token) {
      this.flashNotice('No valid credentials found. Refresh page to login.');
      return;
    }
    this.$http({
      method: 'post',
      url: '/posts/',
      auth: {
        username: token,
        password: '',
      },
      data: {
        title: this.post_title,
        body: this.post_body,
      },
    })
      .then((response) => {
        const slug = this.getSlug(response.data.url);
        this.$emit('publish-success', slug);
      })
      .catch((err) => {
        this.$emit('publish-error', err);
        console.error(err);
      });
  }

  public cancelPublish() {
    this.showPublishModal = false;
  }

  public tryDiscard() {
    if (!this.isChanged()) {
      this.flashNotice('Post not changed, do nothing');
      return;
    }
    this.notice = '';
    this.showDiscardModal = true;
  }

  public confirmDiscard() {
    this.feeding_title = null;
    this.feeding_body = null;
    this.$nextTick(() => {
      this.feeding_title = '';
      this.feeding_body = '';
    });
    this.showDiscardModal = false;
  }

  public cancelDiscard() {
    this.showDiscardModal = false;
  }

  private mounted() {
    this.$on('publish-success', (slug: string) => {
      this.deleteDraft();
      this.$router.push({name: 'Post', params: { slug }});
    });
    document.title = 'Write A New Post - Bradley Zhou';
    this.loadDraft();
  }
}
</script>

<style lang="scss">
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
