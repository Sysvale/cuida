import Transitions from "../../docs-components/Transitions.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Transitions },
  template: `<transitions />`,
});

export default {
  title: "Fundação/Transições",
  component: Transitions,
};

export const Transições = {
  render: Template.bind({}),
  name: "transições",
};
