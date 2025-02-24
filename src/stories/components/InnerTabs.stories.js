import InnerTabs from "../../components/InnerTabs.vue";

const Template = (args) => ({
  components: { CdsInnerTabs: InnerTabs },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px;">
			<cds-inner-tabs
				v-bind="args"
			>
				<template #overview>
					Overview
				</template>
				<template #indicator-1>
					Conteúdo da tab-1
				</template>
				<template #prision-tab>
					Você não pode sair dessa aba pois a propriedade "disableTabChange" está com o valor "true" neste item na propriedade "tabs"
				</template>
				<template #indicator-3>
					Conteúdo da tab-3
				</template>
				<template #indicator-4>
					Conteúdo da tab-4
				</template>
				<template #indicator-5>
					Conteúdo da tab-5
				</template>
				<template #indicator-6>
					Conteúdo da tab-6
				</template>
				<template #indicator-7>
					Conteúdo da tab-7
				</template>
				<template #indicator-8>
					Conteúdo da tab-8
				</template>
			</cds-inner-tabs>
	</div>
	`,
});

const dataSet = [
  {
    title: "Visão geral",
    name: "overview",
  },
  {
    title: "Indicador 1",
    name: "indicator-1",
  },
  {
    title: "Aba Prisão",
    name: "prision-tab",
    disableTabChange: true,
  },
  {
    title: "Indicador 3",
    name: "indicator-3",
  },
  {
    title: "Indicador 4",
    name: "indicator-4",
  },
];

const dataSet2 = [
  {
    title: "Visão geral",
    name: "overview",
  },
  {
    title: "Indicador 1",
    name: "indicator-1",
  },
  {
    title: "Indicador 2",
    name: "indicator-2",
  },
  {
    title: "Indicador 3",
    name: "indicator-3",
  },
  {
    title: "Indicador 4",
    name: "indicator-4",
  },
  {
    title: "Indicador 5",
    name: "indicator-5",
  },
  {
    title: "Indicador com o nome absurdamente grande 6",
    name: "indicator-6",
  },
  {
    title: "Indicador 7",
    name: "indicator-7",
  },
  {
    title: "Indicador 8",
    name: "indicator-8",
  },
];

export default {
  title: "Componentes/Navegação/InnerTabs",
  component: InnerTabs,

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
          "gray",
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

        code: `<cds-inner-tabs
	:tabs="dataSet"
	:activeTab="dataSet[1]"
>
	<template #overview>
		Overview
	</template>
	<template #indicator-1>
		Conteúdo da tab-1
	</template>
	<template #indicator-2>
		Conteúdo da tab-2
	</template>
	<template #indicator-3>
		Conteúdo da tab-3
	</template>
	<template #indicator-4>
		Conteúdo da tab-4
	</template>
</cds-inner-tabs>`,
      },
    },
  },
};

export const InnerTabs = {
  render: Template.bind({}),
  name: "InnerTabs",

  args: {
    tabs: dataSet,
    activeTab: dataSet[1],
  },
};

export const InnerTabs2 = {
  render: Template.bind({}),
  name: "InnerTabs2",

  args: {
    tabs: dataSet2,
    activeTab: dataSet2[1],
  },
};
