import { mount, createLocalVue } from "@vue/test-utils";
import SkeletonText from "../../src/components/SkeletonText.vue";

const localVue = createLocalVue();

test("Component is mounted properly", () => {
  const wrapper = mount(SkeletonText, {
    localVue,
    propsData: {
      width: "300",
      height: "20",
    },
  });
  expect(wrapper).toMatchSnapshot();
});
