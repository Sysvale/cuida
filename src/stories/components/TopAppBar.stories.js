import TopAppBar from "../../components/TopAppBar.vue";
import Icon from "../../components/Icon.vue";

const Template = (args) => ({
  components: { CdsTopAppBar: TopAppBar, CdsIcon: Icon },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="position: relative">
			<img
				src="https://images.unsplash.com/photo-1738526787238-96d5352c2ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				style="width: 100%; height: 100%;"
			/>
			<cds-top-app-bar v-bind="args" />
		</div>
	`,
});

export default {
  title: "Componentes/Estrutural/TopAppBar",
  component: TopAppBar,

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
<cds-top-app-ba
	title="Título legal"
	show-menu-icon
/>`,
      },
    },
  },
};

export const TopAppBar = {
  render: Template.bind({}),
  name: "TopAppBar",

  args: {
    title: "Título bacana",
  },
};
