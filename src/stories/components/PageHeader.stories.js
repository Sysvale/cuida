import PageHeader from "../../components/PageHeader.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  components: { CdsPageHeader: PageHeader, CdsButton: Button },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-page-header
			v-bind="args"
		>
			<template
				#aside
			>
				<cds-button
					secondary
					@click="logClick('Btn 1')"
					text="Button 1"
				/>
				<cds-button
					class="d-flex align-items-center ml-4"
					variant="success"
					@click="logClick('Btn 2')"
					text="Button 2"
				/>
			</template>
		</cds-page-header>
	`,
  methods: {
    logClick(btnName) {
      console.info(btnName);
    },
  },
});

export default {
  title: "Componentes/Estrutural/PageHeader",
  component: PageHeader,

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

        code: `<cds-page-header
	title="Procedimentos"
	subtitle="Gerencie os procedimentos cadastrados"
>
	<template
		#aside
	>
		<div class="d-flex">
			<cds-button
				secondary
				@click="logClick('Btn 1')"
				text="Button 1"
			/>
			<cds-button
				class="d-flex align-items-center ml-4"
				variant="success"
				@click="logClick('Btn 2')"
				text="Button 2"
			/>
		</div>
	</template>
</cds-page-header>`,
      },
    },
  },
};

export const PageHeader = {
  render: Template.bind({}),
  name: "PageHeader",

  args: {
    title: "Procedimentos",
    subtitle:
      "Crie painéis e os associe a serviços. Para acessar os painéis de modo externo, acesse https://short.sysvale.com/totem e insira a chave correspondente.",
  },
};
