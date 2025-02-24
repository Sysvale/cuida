import Border from "../../docs-components/BorderBuilder.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Border },
  template: `<border />`,
});

export default {
  title: "Fundação/Bordas",
  component: Border,
};

export const Borda = {
  render: Template.bind({}),
  name: "borda",
};
