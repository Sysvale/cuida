import Typography from "../../docs-components/Typography.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Typography },
  template: `<typography />`,
});

export default {
  title: "Fundação/Tipografia",
  component: Typography,
};

export const Tokens = {
  render: Template.bind({}),
  name: "tokens",
};
