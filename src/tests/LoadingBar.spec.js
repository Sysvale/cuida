import { mount, createLocalVue } from "@vue/test-utils";
import LoadingBar from "../../src/components/LoadingBar.vue";

const localVue = createLocalVue();

test("Component is mounted properly", () => {
  const wrapper = mount(LoadingBar, {
    localVue,
  });
  expect(wrapper).toMatchSnapshot();
});
