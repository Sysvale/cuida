import IconButton from "../../components/IconButton.vue";

const Template = (args) => ({
  components: { CdsIconButton: IconButton },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-icon-button
			v-bind="args"
			@cds-click="logIconButtonClick"
		/>`,
  methods: {
    logIconButtonClick(event) {
      console.info("%con click: ", "color: #2C70CD;", event);
    },
  },
});

export default {
  title: "Componentes/Forms/IconButton",
  component: IconButton,

  argTypes: {
    variant: {
      control: {
        type: "select",

        options: [
          "white",
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

        code: `<cds-icon-button
	size="sm"
	icon="trash-outline"
/>`,
      },
    },
  },
};

export const IconButton = {
  render: Template.bind({}),
  name: "IconButton",

  args: {
    size: "sm",
    icon: "trash-outline",
    variant: "white",
    tooltipText: "Excluir",
    disabled: false,
    feedbackOnClick: true,
    feedbackIcon: "check-outline",
  },
};
