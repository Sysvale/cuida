import { mount, createLocalVue } from "@vue/test-utils";
import ProgressCircular from "../../src/components/ProgressCircular.vue";

const localVue = createLocalVue();

test("Component is mounted properly", () => {
  const wrapper = mount(ProgressCircular, {
    localVue,
    propsData: {
      value: 33,
    },
  });

  expect(wrapper).toMatchSnapshot();
});
