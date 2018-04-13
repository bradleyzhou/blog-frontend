<docs>
  A markdown editor for posts. Accepts 'feedingTitle' and 'feedingBody' strings for editing, emits 'title-changed' and 'body-changed' when these value changes, and keeps local data-bindings in 'title' and 'post'.
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
      <p>feedingTitle: {{ feedingTitle }}</p>
      <p>feedingBody: {{ feedingBody }}</p>
      <p>title: {{ title }}</p>
      <p>body: {{ body }}</p>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import SimpleMDE from 'simplemde';

@Component
export default class PostEditor extends Vue {
  @Prop({ default: '' })
  public feedingTitle!: string;

  @Prop({ default: '' })
  public feedingBody!: string;

  public title = '';
  public body = '';
  protected mdeB!: SimpleMDE;

  private initTitleEditor() {
    this.title = this.feedingTitle;
  }

  private initBodyEditor() {
    const mdeConfig: SimpleMDE.Options = {
      element: this.$refs.body_editor as HTMLElement,
    };
    require('simplemde/dist/simplemde.min.css');
    this.mdeB = new SimpleMDE(mdeConfig);
    this.mdeB.value(this.feedingBody);

    // register changed body
    this.mdeB.codemirror.on('change', () => {
      this.body = this.mdeB.value();
      this.$emit('body-changed', this.mdeB.value());
    });
  }

  public changeTitle(title: string) {
    if (!title) {
      return;
    }
    // no new-lines in title
    this.title = title.replace(/(?:\r\n|\r|\n)/g, ' ');
    this.$emit('title-changed', this.title);

    // auto-resize textarea
    const titleEl = this.$refs.title_editor as HTMLElement;
    // titleEl.style.height = 'auto';
    titleEl.style.height = titleEl.scrollHeight + 'px';
  }

  protected mounted() {
    this.initTitleEditor();
    this.initBodyEditor();
  }

  protected beforeDestroy() {
    this.mdeB.toTextArea();
  }

  @Watch('feedingTitle')
  private onFeedingTitleChange(updatedTitle: string) {
    // This should be called when parent component finishes asynchronous data fetching
    this.title = updatedTitle;
  }

  @Watch('feedingBody')
  private onFeedingBodyChange(updatedBody: string) {
    // This should be called when parent component finishes asynchronous data fetching
    this.body = updatedBody;
    // Push changes to SimpleMDE editor
    this.mdeB.value(this.feedingBody);
  }

  @Watch('title')
  private onTitleChange(updatedTitle: string) {
    this.changeTitle(updatedTitle);
  }
}
</script>

<style lang="scss">
.title-editor {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  textarea {
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
}

.body-editor {
  width: 100%;
}

.editor-buttons {
  display: flex;
  justify-content: flex-end;

  button {
    font-size: 0.75em;
    margin: auto 5px auto 5px;
  }
}
</style>
