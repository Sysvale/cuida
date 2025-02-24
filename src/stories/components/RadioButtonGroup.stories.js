import RadioButtonGroup from "../../components/RadioButtonGroup.vue";

const Template = (args) => ({
  components: { CdsRadioButtonGroup: RadioButtonGroup },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-radio-button-group
			v-bind="args" 
		/>
	`,
});

const value = "";

const options = [
  {
    text: "Opção desabilitada",
    value: "value1",
    disabled: true,
  },
  {
    text: "Opção habilitada 1",
    body: "Adicione um texto descritivo/explicativo referente a essa opção",
    value: "value2",
  },
  {
    text: "Opção habilitada 2",
    value: "value3",
  },
];

export default {
  title: "Componentes/Forms/RadioButtonGroup",
  component: RadioButtonGroup,

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

        code: `<cds-radio-button-group
	:options="options"
	:value="value"
/>`,
      },
    },
  },
};

export const RadioButtonGroup = {
  render: Template.bind({}),
  name: "Radio button group",

  args: {
    options,
    value,
    disabled: false,
    variant: "green",
    inline: false,
    label: "Label",
  },
};
