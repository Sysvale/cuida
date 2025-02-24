import FlatButton from "../../components/FlatButton.vue";

const Template = (args) => ({
  components: { CdsFlatButton: FlatButton },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-flat-button
			v-bind="args" 
		>
		</cds-flat-button>`,
});

export default {
  title: "Componentes/Forms/FlatButton",
  component: FlatButton,

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

        code: `<cds-flat-button
	variant="green"
	text="Link Button"
/>`,
      },
    },
  },
};

export const FlatButton = {
  render: Template.bind({}),
  name: "FlatButton",

  args: {
    variant: "green",
    text: "Link Button",
  },
};
