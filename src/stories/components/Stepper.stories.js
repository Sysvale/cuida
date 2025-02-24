import Stepper from "../../components/Stepper.vue";

const Template = (args) => ({
  components: { CdsStepper: Stepper },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-stepper
			v-bind="args" 
		/>
	`,
});

const steps = [
  {
    label: "Dados da operadora",
    completed: true,
    inProcessing: false,
    error: false,
  },
  { label: "Bandeira 2", completed: false, inProcessing: true, error: false },
  { label: "Bandeira 3", completed: false, inProcessing: false, error: true },
  { label: "Bandeira 4", completed: false, inProcessing: false, error: false },
  { label: "Bandeira 5", completed: false, inProcessing: false, error: false },
];

export default {
  title: "Componentes/Display/Stepper",
  component: Stepper,

  argTypes: {
    value: {
      value: {
        type: "numeric",
        min: 0,
        step: 1,
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

        code: `<cds-stepper
	:steps="steps"
	:value="4"
/>`,
      },
    },
  },
};

export const Stepper = {
  render: Template.bind({}),
  name: "Stepper",

  args: {
    steps,
    value: 4,
  },
};
