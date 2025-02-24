import TimeInput from "../../components/TimeInput.vue";

const Template = (args) => ({
  components: { CdsTimeInput: TimeInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  template: /*html*/ `
		<cds-time-input
			v-bind="args"
			v-model="value"
		/>`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/TimeInput",
  component: TimeInput,

  argTypes: {
    mode: {
      control: {
        type: "select",
        options: ["single", "range"],
      },
    },

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
<cds-time-input
	label="Horário"
/>`,
      },
    },
  },
};

export const TimeInput = {
  render: Template.bind({}),
  name: "TimeInput",

  args: {
    label: "Horário",
  },
};
