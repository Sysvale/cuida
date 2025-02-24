import Radio from "../../components/Radio.vue";

const Template = (args) => ({
  components: { CdsRadio: Radio },
  setup() {
    return { args };
  },
  data() {
    return {
      selected: "",
    };
  },
  template: /*html*/ `
		<div>
			<cds-radio
				v-model="selected"
				v-bind="args"
			>
				Radio label
			</cds-radio>
		</div>
	`,
});

export default {
  title: "Componentes/Forms/Radio",
  component: Radio,

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

        code: `<cds-radio
	v-model="selected"
	value="option-1"
	label="Opção 1"
>
	Opção de destaque
</cds-radio>`,
      },
    },
  },
};

export const Radio = {
  render: Template.bind({}),
  name: "Radio",

  args: {
    value: "option-1",
    label: "Opção 1",
    disabled: false,
  },
};
