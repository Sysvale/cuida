import Palete from "../../docs-components/Palete.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Palete },
  template: `<palete />`,
});

export default {
  title: "Fundação/Cores",
  component: Palete,
};

export const ColorPalete = {
  render: Template.bind({}),
  name: "Color palete",
};
