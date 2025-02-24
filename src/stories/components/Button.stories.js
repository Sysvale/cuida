import Button from "../../components/Button.vue";

const Template = (args) => ({
  components: { CdsButton: Button },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-button
			v-bind="args"
            @button-click="logButtonClick"
		>
		</cds-button>`,
  methods: {
    logButtonClick(event) {
      console.info("%con click: ", "color: #2C70CD;", event);
    },
  },
});

export default {
  title: "Componentes/Forms/Button",
  component: Button,

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

        code: `<cds-button
	variant="green"
	size="md"
	text="Lorem Ipsum"
    @click="buttonClick = true"
/>`,
      },
    },
  },
};

export const Button = {
  render: Template.bind({}),
  name: "Button",

  args: {
    variant: "green",
    size: "md",
    text: "Button",
    block: false,
  },
};
