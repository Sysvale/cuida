import Divider from "../../components/Divider.vue";

const Template = (args) => ({
  components: { CdsDivider: Divider },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-divider
			v-bind="args" 
		/>`,
});

export default {
  title: "Componentes/Containers/Divider",
  component: Divider,

  argTypes: {
    width: {
      control: {
        type: "range",
        min: 0,
        max: 800,
        step: 20,
      },
    },
  },

  /*html*/
  parameters: {
    viewMode: "docs",

    previewTabs: {
      canvas: {
        hidden: true,
      },
    },

    docs: {
      source: {
        language: "html",
        format: true,

        code: `
<cds-divider />`,
      },
    },
  },
};

export const Divider = {
  render: Template.bind({}),
  name: "Divider",

  args: {
    width: 150,
  },
};
