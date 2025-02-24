import List from "../../components/List.vue";
import IconButton from "../../components/IconButton.vue";

const Template = (args) => ({
  components: { CdsList: List, CdsIconButton: IconButton },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-list
			v-bind="args"
		>
			<template #actions>
				<cds-icon-button icon="edit-outline" />
			</template>
		</cds-list>
	`,
});

const items = [
  {
    title: "Goku o maior de todos os tempos",
    content:
      "Todo mundo sabe que ele é o mais forte do mundo (não é atoa o filme 2)",
  },
  {
    title: "Invejosos dirão que é o Gohan",
    content:
      "Mas também todo mundo sabe que ele é um banana depois da saga do Cell",
  },
  {
    title: "Todo mundo gosta do Vegeta",
    content: "Claro que sim, não tem como não gostar",
  },
];

export default {
  title: "Componentes/Display/List",
  component: List,

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

        code: `<cds-
	:items="items"
/>`,
      },
    },
  },
};

export const List = {
  render: Template.bind({}),
  name: "List",

  args: {
    items,
  },
};
