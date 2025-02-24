import PageContainer from "../../components/PageContainer.vue";

const Template = (args) => ({
  components: { CdsPageContainer: PageContainer },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-page-container
				style="background: silver"
			>
				Componente interno
			</cds-page-container>
		</div>
	`,
});

export default {
  title: "Componentes/Estrutural/PageContainer",
  component: PageContainer,

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

        code: `<cds-page-container>
	Teste
</cds-page-container>`,
      },
    },
  },
};

export const PageContainer = {
  render: Template.bind({}),
  name: "PageContainer",
};
