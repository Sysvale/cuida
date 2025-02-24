import Iconography from "../../docs-components/Iconography.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Iconography },
  template: `<iconography />`,
});

export default {
  title: "Fundação/Iconografia",
  component: Iconography,
};

export const Iconography = {
  render: Template.bind({}),
  name: "Iconography",
};
