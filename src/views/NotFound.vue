<docs>
  Not Found Error page.
</docs>

<template lang="html">
  <div class="not-found">
    <h1>Ooops! Something isn't right ...</h1>
    <h2>Better luck next time :P</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default class NotFound extends Vue {
}
</script>

<style lang="scss">
.not-found {
  h1 {
    font-size: 3.16em;
  }

  h2 {
    color: #666;
  }
}
</style>
