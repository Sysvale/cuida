import Elevation from "../../docs-components/Elevation.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: { Elevation },
  template: `<elevation />`,
});

export default {
  title: "Fundação/Elevação",
  component: Elevation,
};

export const Elevação = {
  render: Template.bind({}),
  name: "elevação",
};
