import SideBar from "../../components/SideBar.vue";

const Template = (args) => ({
  components: { CdsSideBar: SideBar },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-side-bar
			v-bind="args"
			@sidebar-click="logClick"
			@search-button-click="logSearchButtonClick"
			@collapse-click="logCollapseClick"
			@logout="logLogout"
		>
			<template #logo>
				<img
					v-if="!args.light"
					src="https://framerusercontent.com/images/Xdjpf9nazmZOoS2SUnbbkwsaFk.png"
				>
				<img
					v-else
					src="https://framerusercontent.com/images/cF8DHaPnyhgullDGcpLnyXwGUp4.png"
				>
			</template>
		</cds-side-bar>`,
  methods: {
    logClick(element) {
      console.info("%clogItemClick: ", "color: #2C70CD;", element);
    },
    logCollapseClick(element) {
      console.info("%clogCollapseClick: ", "color: #2C70CD;", element);
    },
    logLogout(element) {
      console.info("%clogLogout: ", "color: #2C70CD;", element);
    },
    logSearchButtonClick(element) {
      console.info("%clogSearchButtonClick: ", "color: #2C70CD;", element);
    },
  },
});

const items = [
  {
    label: "Dashboard",
    icon: "dashboard-outline",
    type: "route",
    route: {
      path: "/dashboard",
      name: "dashboard",
    },
  },
  {
    label: "Atendimento",
    icon: "clipboard-text-outline",
    type: "route",
    route: {
      path: "/attendance",
      name: "attendance",
    },
  },
  {
    label: "Links",
    icon: "link-outline",
    items: [
      {
        label: "Painel (Tv)",
        route: {
          path: "https://www.google.com",
          name: "painel-tv",
        },
        type: "external",
      },
      {
        label: "Totem",
        route: {
          path: "https://www.wikipedia.org/",
          name: "totem",
        },
        type: "external",
      },
    ],
  },
  {
    label: "Relatórios",
    icon: "printer-outline",
    type: "route",
    route: {
      path: "/reports",
      name: "pagina2",
    },
  },
  {
    label: "Configurações",
    icon: "settings-outline",
    type: "route",
    items: [
      {
        label: "Painel (Tv)",
        route: {
          path: "/tv",
          name: "tv",
        },
      },
      {
        label: "Totem",
        route: {
          path: "/totem",
          name: "totem",
        },
      },
      {
        label: "Serviços",
        route: {
          path: "/services",
          name: "serviços",
        },
      },
      {
        label: "Categorias",
        route: {
          path: "/categories",
          name: "categorias",
        },
      },
      {
        label: "Prioridades",
        route: {
          path: "/priorities",
          name: "prioridades",
        },
      },
    ],
  },
  {
    label: "Suporte",
    icon: "lifebuoy-outline",
    type: "link",
    route: {
      path: "/support",
      name: "support",
    },
  },
];

export default {
  title: "Componentes/Navegação/SideBar",
  component: SideBar,

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

        code: `<cds-side-bar
	v-bind="args"
	@click="logClick"
/>`,
      },
    },
  },
};

export const SideBar = {
  render: Template.bind({}),
  name: "SideBar",

  args: {
    variant: "indigo",
    items: items,
    activeItem: items[4],
    userName: "Joana Mendes",
    userRole: "Administradora",
    userPicture: "https://thispersondoesnotexist.com/",
    collapsible: true,
    collapsibleState: false,
    logoImage:
      "https://framerusercontent.com/images/Xdjpf9nazmZOoS2SUnbbkwsaFk.png",
    light: false,
    searchButton: false,
  },
};
