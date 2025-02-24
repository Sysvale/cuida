import Switch from "../../components/Switch.vue";

const Template = (args) => ({
  components: { CdsSwitch: Switch },
  data() {
    return {
      value: false,
    };
  },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-switch
			v-bind="args"
			v-model="value"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/Switch",
  component: Switch,

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

        code: `
<cds-switch
	v-model="isSelected"
/>`,
      },
    },
  },
};

export const Switch = {
  render: Template.bind({}),
  name: "Switch",
  args: {},
};
