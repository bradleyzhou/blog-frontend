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
export default class Edit extends Vue {
  private api_url = '';
  private old_title = '';
  private old_body = '';
  public feeding_title: string | null = '';
  public feeding_body: string | null = '';
  public post_title = '';
  public post_body = '';
  public notice = '';
  public showPublishModal = false;
  public showDiscardModal = false;

  @Prop({ default: '' })
  public slug!: string;

  private flashNotice(messege: string, duration = 5000) {
    this.notice = messege;
    setTimeout(() => { this.notice = ''; }, duration);
  }

  private loadPost(slug = this.slug) {
    const url = '/posts/' + slug;
    this.$http.get(url).then(
      (response) => {
        this.api_url = response.data.url;
        this.old_title = response.data.title;
        this.old_body = response.data.body;
        if (this.old_title) {
          document.title = 'Edit - ' + this.old_title + ' - Bradley Zhou';
        }
        this.$emit('old-post-loaded', 'Old post has been stored in old_title and old_body');
    });
  }

  private isChanged() {
    return (this.old_title !== this.post_title) ||
            (this.old_body !== this.post_body);
  }

  private isPostValid() {
    return (this.post_title !== '') &&
            (this.post_body !== '');
  }

  private saveEditDraft() {
    // save edit draft to localStorage
    this.flashNotice('Saving edit draft to local storage');
    localStorage.setItem('edit_draft_title', this.post_title);
    localStorage.setItem('edit_draft_body', this.post_body);
  }

  private loadEditDraft() {
    // load edit draft from localStorage, if no draft load old post
    const title = localStorage.getItem('edit_draft_title');
    const body = localStorage.getItem('edit_draft_body');
    if (!title || !body) {
      this.feeding_title = this.old_title;
      this.feeding_body = this.old_body;
      return;
    }
    this.flashNotice('Loading edit draft from local storage');
    this.feeding_title = title;
    this.feeding_body = body;
  }

  private deleteEditDraft() {
    // remove edit_draft from localStorage
    this.flashNotice('Deleting edit draft in local storage');
    localStorage.removeItem('edit_draft_title');
    localStorage.removeItem('edit_draft_body');
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
    this.saveEditDraft();
    const token = this.$auth.getToken();
    if (!token) {
      this.flashNotice('No valid credentials found. Refresh page to login.');
      return;
    }
    this.$http({
      method: 'put',
      url: '/posts/' + this.slug,
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
    // revert editor title and body to original old_title and old_body
    this.feeding_title = null;
    this.feeding_body = null;
    this.$nextTick(() => {
      this.feeding_title = this.old_title;
      this.feeding_body = this.old_body;
    });
    this.showDiscardModal = false;
  }

  public cancelDiscard() {
    this.showDiscardModal = false;
  }

  protected mounted() {
    this.loadPost();
    this.$on('old-post-loaded', () => {
      this.loadEditDraft();
    });
    this.$on('publish-success', (slug: string) => {
      this.deleteEditDraft();
      this.$router.push({name: 'Post', params: { slug }});
    });
  }
}
</script>

<style lang="scss">
.post-edit {
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
