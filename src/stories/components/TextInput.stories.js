import TextInput from "../../components/TextInput.vue";

const Template = (args) => ({
  components: { CdsTextInput: TextInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  template: /*html*/ `
		<cds-text-input
			v-bind="args" 
			v-model="value"
			@click="logClick"
			@change="logChange"
			@focus="logFocus"
			@blur="logBlur"
			@keydown="logKeydown"
		/>`,
  methods: {
    logClick() {
      console.info("⚡ %cClick emitted", "color: rgb(37, 227, 139);");
    },
    logChange() {
      console.info("⚡ %cChange emitted", "color: hsl(152, 77.20%, 51.80%);");
    },
    logFocus() {
      console.info("⚡ %cFocus emitted", "color: hsl(152, 77.20%, 51.80%);");
    },
    logBlur() {
      console.info("⚡ %cBlur emitted", "color: hsl(152, 77.20%, 51.80%);");
    },
    logKeydown(e) {
      console.info("⚡ %cKeydown emitted", "color: hsl(152, 77.20%, 51.80%);");
    },
  },
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

const supportingText = [
  "Essa informação vai ser usada para recuperar sua conta caso esqueça a senha.",
  "O text deve ter até 100 caracteres",
];

export default {
  title: "Componentes/Forms/TextInput",
  component: TextInput,

  argTypes: {
    state: {
      control: {
        type: "select",
        options: ["default", "valid", "invalid", "loading"],
      },
    },

    inputType: {
      control: {
        type: "select",
        options: ["text", "email"],
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
<cds-text-input />`,
      },
    },
  },
};

export const TextInput = {
  render: Template.bind({}),
  name: "TextInput",

  args: {
    inputType: "text",
    disabled: false,
    state: "default",
    required: false,
    fluid: false,
    mobile: false,
    floatingLabel: false,
    lazy: false,
    label: "Texto",
    placeholder: "Digite algo...",
    errorMessage: "Campo obrigatório",
    mask: null,
    tooltip: "",
    tooltipIcon: "info-outline",
    linkText: "",
    linkUrl: "",
    supportingText: "supportingText",
    supportLink: "",
    supportLinkUrl: "",
  },
};
