import StepperInput from "../../components/StepperInput.vue";

const Template = (args) => ({
  components: { CdsStepperInput: StepperInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: 0,
    };
  },
  template: /*html*/ `
		<cds-stepper-input
			v-bind="args"
			v-model="value"
			@click="logClick"
			@focus="logFocus"
			@blur="logBlur"
			@change="logChange"
		/>
	`,
  methods: {
    logClick() {
      console.info("⚡ %cClick emitted", "color:rgb(188, 140, 255);");
    },
    logFocus() {
      console.info("⚡ %cFocus emitted", "color:rgb(249, 120, 232);");
    },
    logBlur() {
      console.info("⚡ %cBlur emitted", "color:rgb(37, 227, 139);");
    },
    logChange() {
      console.info("⚡ %cChange emitted", "color:rgb(228, 235, 104);");
    },
  },
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/StepperInput",
  component: StepperInput,

  argTypes: {
    state: {
      control: {
        type: "select",
        options: ["default", "valid", "invalid"],
      },
    },

    width: {
      control: {
        type: "select",
        options: ["thin", "default", "wide", "fluid"],
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
        code: `<cds-stepper-input />`,
      },
    },
  },
};

export const StepperInput = {
  render: Template.bind({}),
  name: "StepperInput",

  args: {
    mobile: false,
    step: 1,
    disabled: false,
    required: true,
    fluid: false,
    suffix: "",
  },
};
