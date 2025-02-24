import PinInput from "../../components/PinInput.vue";

const Template = (args) => ({
  components: { CdsPinInput: PinInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  template: /*html*/ `
		<cds-pin-input
			v-bind="args"
			v-model="value"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/PinInput",
  component: PinInput,

  argTypes: {
    state: {
      control: {
        type: "select",
        options: ["default", "valid", "invalid"],
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
        code: `<cds-pin-input />`,
      },
    },
  },
};

export const PinInput = {
  render: Template.bind({}),
  name: "PinInput",
};
