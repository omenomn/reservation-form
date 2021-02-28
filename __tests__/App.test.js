import { mount } from '@vue/test-utils'
import App from "./../src/js/App.vue";
import Calendar from "./../src/js/components/calendar/Calendar.vue";
import moment from 'moment'

describe("App.test.js", () => {
  test('Calendar', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.text()).toContain(moment().format('MMMM YYYY'))
  })
  test('App', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('300 zł')
  })
});