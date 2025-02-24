import ProgressBar from "../../components/ProgressBar.vue";

const Template = (args) => ({
  components: { CdsProgressBar: ProgressBar },
  setup() {
    return { args };
  },
  template: /*html*/ `<cds-progress-bar v-bind="args"/>`,
});

export default {
  title: "Componentes/Display/ProgressBar",
  component: ProgressBar,

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
          "gray",
        ],
      },
    },

    value: {
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
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

        code: `<cds-progress-bar
	showText
	:value="0.5"
/>`,
      },
    },
  },
};

export const ProgressBar = {
  render: Template.bind({}),
  name: "Progress bar",

  args: {
    value: 0.5,
    showText: true,
  },
};
