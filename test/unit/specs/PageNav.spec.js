import Vue from 'vue'
import PageNav from '@/components/PageNav'
import '@/main'

describe('PageNav.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(PageNav)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.nav-col span').textContent)
      .to.contain('Bradley Zhou')
  })
})
