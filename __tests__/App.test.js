import { mount } from '@vue/test-utils'
import App from "./../src/js/App.vue";

describe("App.test.js", () => {
  test('Hello world!', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Hello world!')
  })
});