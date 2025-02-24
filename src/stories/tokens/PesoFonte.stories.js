import FontWeight from "../../docs-components/FontWeight.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { FontWeight },
  template: `<font-weight />`,
});

export default {
  title: "Fundação/Peso da Fonte",
  component: FontWeight,
};

export const PesoDaFonte = {
  render: Template.bind({}),
  name: "Peso da Fonte",
};
