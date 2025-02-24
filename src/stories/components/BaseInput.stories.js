import BaseInput from "../../components/BaseInput.vue";

const Template = (args) => ({
  components: { CdsBaseInput: BaseInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  template: /*html*/ `
		<cds-base-input
			v-bind="args" 
			v-model="value"
			@click="logClick"
			@focus="logFocus"
			@blur="logBlur"
			@keydown="logKeydown"
		>
			<template #trailing-icon2>
				OPA
			</template>
			<template #leading-icon2>
				UPA
			</template>
		</cds-base-input>`,
  methods: {
    logBlur() {
      console.info("blur event");
    },
    logFocus() {
      console.info("focus event");
    },
    logClick() {
      console.info("click event");
    },
    logKeydown(e) {
      console.info("keydown event -> ", e);
    },
  },
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

const supportingText = ["We’ll use this address if", "Ask for help"];

export default {
  title: "Componentes/Forms/BaseInput",
  component: BaseInput,

  argTypes: {
    state: {
      control: {
        type: "select",
        options: ["default", "valid", "invalid", "loading"],
      },
    },

    type: {
      control: {
        type: "select",
        options: [
          "text",
          "email",
          "password",
          "tel",
          "number",
          "search",
          "url",
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

        code: `
<cds-text-input />`,
      },
    },
  },
};

export const BaseInput = {
  render: Template.bind({}),
  name: "BaseInput",

  args: {
    type: "text",
    state: "default",
    disabled: false,
    floatingLabel: false,
    required: false,
    fluid: false,
    lazy: false,
    placeholder: "Digite algo...",
    supportingText: supportingText,
    errorMessage: "Campo obrigatório",
    tooltip: "",
    tooltipIcon: "info-outline",
    linkText: "link",
    trailingIcon: "info-outline",
    leadingIcon: "info-outline",
  },
};
