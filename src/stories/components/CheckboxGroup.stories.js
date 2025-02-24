import CheckboxGroup from "../../components/CheckboxGroup.vue";

const Template = (args) => ({
  components: { CdsCheckboxGroup: CheckboxGroup },
  setup() {
    return { args };
  },
  data() {
    return {
      value: ["test-1"],
    };
  },
  template: /*html*/ `
		<cds-checkbox-group
			v-bind="args"
			@update:model-value="handleValueChange"
		/>
	`,
  methods: {
    handleValueChange(value) {
      console.info("v-model: ", value);
    },
  },
});

export default {
  title: "Componentes/Forms/CheckboxGroup",
  component: CheckboxGroup,

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

        code: `<cds-checkbox-group
	v-model="value"
	label="Checkbox Group"
/>`,
      },
    },
  },
};

export const CheckboxGroup = {
  render: Template.bind({}),
  name: "CheckboxGroup",

  args: {
    label: "Checkbox Group",
    modelValue: ["test-1"],
    state: "default",

    options: [
      {
        label: "Teste 1",
        value: "test-1",
      },
      {
        label: "Teste 2",
        value: "test-2",
      },
      {
        label: "Teste 3",
        value: "test-3",
      },
    ],

    disabled: false,
    variant: "green",
  },
};
