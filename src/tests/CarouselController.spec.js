import { mount, createLocalVue } from "@vue/test-utils";
import CarouselController from "../../src/components/CarouselController.vue";

const localVue = createLocalVue();

test("Component is mounted properly", () => {
  const wrapper = mount(CarouselController, {
    localVue,
    propsData: {
      total: 12,
      perPage: 4,
      propertyName: "Métricas",
    },
  });
  expect(wrapper).toMatchSnapshot();
});
