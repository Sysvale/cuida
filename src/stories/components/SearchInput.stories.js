import SearchInput from "../../components/SearchInput.vue";

const Template = (args) => ({
  components: { CdsSearchInput: SearchInput },
  setup() {
    return { args };
  },
  data() {
    return {
      value: "",
    };
  },
  template: /*html*/ `
		<cds-search-input
			v-bind="args"
			v-model="value"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/SearchInput",
  component: SearchInput,

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
        code: `<cds-search-input />`,
      },
    },
  },
};

export const SearchInput = {
  render: Template.bind({}),
  name: "SearchInput",

  args: {
    modelValue: "",
    disabled: false,
    placeholder: "Busque...",
    fluid: false,
  },
};
