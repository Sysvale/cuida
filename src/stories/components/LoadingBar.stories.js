import LoadingBar from "../../components/LoadingBar.vue";

const Template = (args) => ({
  components: { CdsLoadingBar: LoadingBar },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<center>
			<cds-loading-bar
				v-bind="args"
			/>
		</center>
	`,
});

export default {
  title: "Componentes/Loaders/LoadingBar",
  component: LoadingBar,

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
        code: `<cds-loading-bar />`,
      },
    },
  },
};

export const LoadingBar = {
  render: Template.bind({}),
  name: "LoadingBar",
};
