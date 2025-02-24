import PasswordInput from "../../components/PasswordInput.vue";

const Template = (args) => ({
  components: { CdsPasswordInput: PasswordInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  template: /*html*/ `
		<cds-password-input
			v-bind="args" 
			v-model="value"
		/>`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/PasswordInput",
  component: PasswordInput,

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

        code: `
                <cds-password-input />`,
      },
    },
  },
};

export const PasswordInput = {
  render: Template.bind({}),
  name: "PasswordInput",
};
