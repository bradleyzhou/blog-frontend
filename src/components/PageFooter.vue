<docs>
  The footer of the blog app, includes copyright info and social links.
</docs>

<template lang="html">
  <footer>
    <p class="footer-text footer-col">© 2017-2018 Bradley Zhou. All Rights Reserved.</p>
    <ul class="footer-col icons-link">
      <li>
        <a target="_blank" href="https://github.com/bradleyzhou">
          <svg aria-hidden="true" class="octicon octicon-mark-github github-icon"  version="1.1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
      </li>
      <li>
        <a target="_blank" href="https://twitter.com/zhoubradley">
          <svg version="1.1" class="twitter-icon" viewBox="0 0 400 400">
          <path  d="M400,200c0,110.5-89.5,200-200,200S0,310.5,0,200S89.5,0,200,0S400,89.5,400,200z M163.4,305.5
          	c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25c-8.6,3.8-17.9,6.4-27.7,7.6
          	c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2c-26.6,0-48.2,21.6-48.2,48.2
          	c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6
          	c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5
          	c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7C110.8,297.5,136.2,305.5,163.4,305.5"/>
          </svg>
        </a>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PageFooter extends Vue {
}
</script>

<style lang="scss">
footer {
  height: 35px;
  padding: 20px 40px 20px 40px;
  margin-top: 40px;
  border-top: 1px solid #D0DAF1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .footer-col {
    margin: auto;
  }

  p.footer-text {
    font-size: 12px;
    color: #667AA6;
  }

  ul.icons-link {
    display: flex;
    list-style-type: none;
    position: relative;

    li {
      margin: auto;
      margin-right: 0.5em;
      height: 100%;
      box-sizing: border-box;

      &:last-child {
        margin-right: auto;
      }
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: #0E3589;
    opacity: 0.25;
    transition: 300ms ease-in-out;

    &:hover {
      opacity: 0.75;
    }
  }
}
</style>
