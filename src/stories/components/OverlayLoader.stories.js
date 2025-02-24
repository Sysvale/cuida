import OverlayLoader from "../../components/OverlayLoader.vue";

const Template = (args) => ({
  components: { CdsOverlayLoader: OverlayLoader },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-overlay-loader
			v-bind="args"
		/>
	`,
});

export default {
  title: "Componentes/Loaders/OverlayLoader",
  component: OverlayLoader,

  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },

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
          "white",
        ],
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

        code: `<cds-overlay-loader
	variant="green"
	size="md"
/>`,
      },
    },
  },
};

export const OverlayLoader = {
  render: Template.bind({}),
  name: "OverlayLoader",
};
