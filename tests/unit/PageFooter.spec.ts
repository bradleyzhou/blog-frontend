import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import PageFooter from '@/components/PageFooter.vue';

describe('PageFooter.vue component', () => {
  it('renders copyright message', () => {
    const copyrightMessage = 'All Rights Reserved';
    const wrapper = shallow(PageFooter, {
    });
    expect(wrapper.text()).to.include(copyrightMessage);
  });
});
