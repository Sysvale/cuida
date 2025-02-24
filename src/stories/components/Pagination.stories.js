import Pagination from "../../components/Pagination.vue";

const Template = (args) => ({
  components: { CdsPagination: Pagination },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-pagination
			v-bind="args"
		/>`,
});

export default {
  title: "Componentes/Navegação/Pagination",
  component: Pagination,

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

        code: `<cds-pagination
	v-model="page"
	per-page="10"
	total="60"
/>`,
      },
    },
  },
};

export const Pagination = {
  render: Template.bind({}),
  name: "Pagination",

  args: {
    value: 1,
    perPage: 10,
    total: 60,
  },
};
