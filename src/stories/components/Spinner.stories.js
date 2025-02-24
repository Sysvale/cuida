import Spinner from "../../components/Spinner.vue";

const Template = (args) => ({
  components: { CdsSpinner: Spinner },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-spinner
			v-bind="args"
		/>
	`,
});

export default {
  title: "Componentes/Loaders/Spinner",
  component: Spinner,

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

        code: `<cds-spinner
	variant="green"
	size="md"
/>`,
      },
    },
  },
};

export const Spinner = {
  render: Template.bind({}),
  name: "Spinner",

  args: {
    delay: 0,
  },
};
