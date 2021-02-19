import { mount } from '@vue/test-utils'
import App from "./../src/js/App.vue";
import Calendar from "./../src/js/components/calendar/Calendar.vue";

describe("App.test.js", () => {
  test('Hello world!', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Hello world!')
  })
  test('Calendar', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.text()).toContain(wrapper.vm.id)
  })
});