import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import { mount, createLocalVue } from "@vue/test-utils";
import { PanelCard } from "../../src/components";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

test("Component is mounted properly", () => {
  const wrapper = mount(PanelCard, {
    localVue,
    propsData: {
      title: "Redes",
      subtitle: "Habilite as redes da regulação",
    },
  });

  expect(wrapper).toMatchSnapshot();
});
