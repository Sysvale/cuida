import InlineDateInput from "../../components/InlineDateInput.vue";

const Template = (args) => ({
  components: { CdsInlineDateInput: InlineDateInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "2000-01-01",
    };
  },
  template: /*html*/ `
		<cds-inline-date-input
			v-bind="args"
			v-model="value"
		/>`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/InlineDateInput",
  component: InlineDateInput,

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

    state: {
      control: {
        type: "select",
        options: ["default", "valid", "invalid"],
      },
    },

    range: {
      control: {
        type: "boolean",
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
<cds-inline-date-input
	label="Horário"
/>`,
      },
    },
  },
};

export const InlineDateInput = {
  render: Template.bind({}),
  name: "InlineDateInput",

  args: {
    variant: "blue",
    range: true,
    label: "Período",
  },
};
