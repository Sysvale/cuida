import Breadcrumb from "../../components/Breadcrumb.vue";

const Template = (args) => ({
  components: { CdsBreadcrumb: Breadcrumb },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-breadcrumb
			v-bind="args"
		/>
	`,
});

const items = [
  {
    label: "Relatórios",
    route: {
      path: "/reports",
      name: "reports",
    },
  },
  {
    label: "Relatórios individualizados",
    route: {
      path: "/individualized-reports",
      name: "individualized",
    },
  },
  {
    label: "Relatório de usuários",
    route: {
      path: "/users-reports",
      name: "users",
    },
  },
];

const items2 = [
  {
    label: "Relatórios",
    route: {
      path: "/reports",
      name: "reports",
    },
  },
  {
    label: "Relatórios individualizados",
    route: {
      path: "/individualized-reports",
      name: "individualized",
    },
  },
];

export default {
  title: "Componentes/Navegação/Breadcrumb",
  component: Breadcrumb,

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

        code: `<cds-breadcrumb
	:items="items"
/>`,
      },
    },
  },
};

export const Breadcrumb = {
  render: Template.bind({}),
  name: "Breadcrumb",

  args: {
    items: items,
  },
};

export const TwoLevelBreadcrumb = {
  render: Template.bind({}),
  name: "two-level-breadcrumb",

  args: {
    items: items2,
  },
};
