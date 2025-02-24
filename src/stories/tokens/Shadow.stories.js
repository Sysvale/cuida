import Shadow from "../../docs-components/Shadows.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Shadow },
  template: `<shadow />`,
});

export default {
  title: "Fundação/Sombras",
  component: Shadow,
};

export const Shadow = {
  render: Template.bind({}),
  name: "shadow",
};
