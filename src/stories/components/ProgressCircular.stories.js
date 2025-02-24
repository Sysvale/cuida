import ProgressCircular from "../../components/ProgressCircular.vue";

const Template = (args) => ({
  components: { CdsProgressCircular: ProgressCircular },
  setup() {
    return { args };
  },
  template: /*html*/ `<cds-progress-circular v-bind="args"/>`,
});

export default {
  title: "Componentes/Display/ProgressCircular",
  component: ProgressCircular,

  argTypes: {
    variant: {
      control: {
        type: "select",

        options: [
          "green",
          "teal",
          "turquoise",
          "blue",
          "indigo",
          "violet",
          "pink",
          "red",
          "orange",
          "amber",
          "dark",
        ],
      },
    },

    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },

    value: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
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

        code: `<cds-progress-circular
	variant="blue"
	size="md"
	:value="35"
/>`,
      },
    },
  },
};

export const ProgressCircular = {
  render: Template.bind({}),
  name: "Progress circular",

  args: {
    value: 35,
    variant: "blue",
  },
};
