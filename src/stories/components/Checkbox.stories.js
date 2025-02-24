import Checkbox from "../../components/Checkbox.vue";

const Template = (args) => ({
  components: { CdsCheckbox: Checkbox },
  setup() {
    return { args };
  },
  data() {
    return {
      value: false,
      indeterminate: false,
    };
  },
  template: /*html*/ `
		<cds-checkbox
			v-bind="args"
			v-model="value"
			v-model:indeterminate="indeterminate"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
    console.info(
      "%cv-model:indeterminate: ",
      "color: #2C70CD;",
      this.indeterminate,
    );
  },
});

export default {
  title: "Componentes/Forms/Checkbox",
  component: Checkbox,

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

        code: `<cds-checkbox
	v-model="value"
	label="checkbox"
/>`,
      },
    },
  },
};

export const Checkbox = {
  render: Template.bind({}),
  name: "Checkbox",

  args: {
    label: "Checkbox",
    modelValue: false,
    indeterminate: false,
    disabled: false,
    prominent: false,
    variant: "green",
  },
};
