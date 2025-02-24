import NumberInput from "../../components/NumberInput.vue";

const Template = (args) => ({
  components: { CdsNumberInput: NumberInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: 0,
      unmaskedValue: 0,
    };
  },
  template: /*html*/ `
		<cds-number-input
			v-bind="args" 
			v-model="value"
			v-model:unmaskedValue="unmaskedValue"
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
    console.info(
      "%cv-model:unmaskedValue ",
      "color: #2C70CD;",
      this.unmaskedValue,
    );
  },
});

export default {
  title: "Componentes/Forms/NumberInput",
  component: NumberInput,

  argTypes: {
    state: {
      control: {
        type: "select",
        options: ["default", "valid", "invalid", "loading"],
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
<cds-number-input />`,
      },
    },
  },
};

export const NumberInput = {
  render: Template.bind({}),
  name: "NumberInput",

  args: {
    money: true,
    label: "Valor",
    mobile: false,
    disabled: false,
    required: false,
    fluid: false,
    floatingLabel: false,
    lazy: false,
    errorMessage: "Campo obrigatório",
    state: "default",
    placeholder: "Digite algo...",
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
