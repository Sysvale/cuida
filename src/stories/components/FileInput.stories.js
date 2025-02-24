import FileInput from "../../components/FileInput.vue";

const Template = (args) => ({
  components: { CdsFileInput: FileInput },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-file-input
			v-bind="args" 
		/>
	`,
});

export default {
  title: "Componentes/Forms/FileInput",
  component: FileInput,

  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
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
        code: `<cds-file-input />`,
      },
    },
  },
};

export const FileInput = {
  render: Template.bind({}),
  name: "FileInput",
};
