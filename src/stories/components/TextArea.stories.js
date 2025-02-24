import TextArea from "../../components/TextArea.vue";

const Template = (args) => ({
  components: { CdsTextArea: TextArea },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  template: /*html*/ `
		<cds-text-area
			v-bind="args" 
			v-model="value"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/TextArea",
  component: TextArea,

  argTypes: {
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
<cds-text-area />`,
      },
    },
  },
};

export const TextArea = {
  render: Template.bind({}),
  name: "TextArea",
  args: {},
};
