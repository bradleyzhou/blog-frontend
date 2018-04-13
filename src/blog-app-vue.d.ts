import Vue from 'vue';
import { Auth } from '@/auth';
import { AxiosStatic } from 'axios';
import { Moment } from 'moment';
import { MarkdownIt } from 'markdown-it';

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth;
    $http: AxiosStatic;
    $moment: Moment;
    $md: MarkdownIt;
  }
}
