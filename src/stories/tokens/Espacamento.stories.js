import Space from "../../docs-components/Space.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Space },
  template: `<space />`,
});

export default {
  title: "Fundação/Espaçamento",
  component: Space,
};

export const Escala = {
  render: Template.bind({}),
  name: "escala",
};
