import PageLayout from "../../components/PageLayout.vue";

const Template = (args) => ({
  components: { CdsPageLayout: PageLayout },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-page-layout
			v-bind="args"
			@navigation-item-click="logClick"
			@sidebar-item-click="logClick"
			@sidebar-logout="logLogout"
		>
			<template #default>
				Conteúdo da página
			</template>
		</cds-page-layout>`,
  methods: {
    logClick(element) {
      console.info("%clogItemClick: ", "color: #2C70CD;", element);
    },
    logLogout(element) {
      console.info("%clogLogout: ", "color: #2C70CD;", element);
    },
  },
});

const sideBarItems = [
  {
    label: "Início",
    icon: "home-outline",
    type: "route",
    route: {
      path: "/home",
      name: "home",
    },
  },
  {
    label: "Vigilância Sanitária",
    icon: "shield-outline",
    type: "route",
    route: {
      path: "/visa",
      name: "visa",
    },
  },
  {
    label: "Central de marcação",
    icon: "calendar-outline",
    type: "route",
    route: {
      path: "/regulation",
      name: "regulation",
    },
  },
  {
    label: "Cuidados médicos",
    icon: "heart-rate-outline",
    type: "route",
    route: {
      path: "/medical-care",
      name: "medical-care",
    },
  },
];

const navigationItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    route: {
      name: "dashboard",
    },
  },
  {
    key: "home",
    label: "Inicio",
    route: {
      name: "home",
    },
  },
  {
    key: "reports",
    label: "Relatórios",
    subitems: [
      {
        key: "productivity",
        label: "Relatório de produtividade",
        route: {
          name: "productivity",
        },
      },
      {
        key: "time-sheet",
        label: "Folha de ponto",
        route: {
          name: "timesheet",
        },
      },
    ],
  },
];

export default {
  title: "Componentes/Navegação/PageLayout",
  component: PageLayout,

  argTypes: {
    variant: {
      control: {
        type: "select",

        options: [
          "turquoise",
          "green",
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

        code: `<cds-page-layout
	v-bind="args"
	@click="logClick"
/>`,
      },
    },
  },
};

export const PageLayout = {
  render: Template.bind({}),
  name: "PageLayout",

  args: {
    variant: "indigo",
    light: true,

    user: {
      name: "Joana Mendes",
      role: "Administradora",
      picture:
        "https://this-person-does-not-exist.com/img/avatar-gen83fa18cdcd216e7220794a23e76fe0dc.jpg",
    },

    collapsibleSideBar: true,
    sideBarItems,
    sideBarActiveItem: sideBarItems[2],
    navigationActiveItem: navigationItems[1],
    navigationItems,

    logos: {
      default:
        "https://framerusercontent.com/images/cF8DHaPnyhgullDGcpLnyXwGUp4.png",
      collapsed: "https://i.imgur.com/aNrsz0h.png",
    },
  },
};
