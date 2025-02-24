import MobileNavbar from "../../components/MobileNavbar.vue";
import { colorOptions } from "../../utils/constants/colors";

const Template = (args) => ({
  components: { CdsMobileNavbar: MobileNavbar },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="position: relative">
			<img
				src="https://images.unsplash.com/photo-1705437917228-3f971a25de6a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				style="width: 100%; height: 100%;"
			/>
			<cds-mobile-navbar
				style="position: absolute; bottom: 0; left: 0; width: 100%;"
				v-bind="args"
				@item-click="console.info('item-click: ', $event)"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Navegação/MobileNavbar",
  component: MobileNavbar,

  argTypes: {
    variant: {
      control: {
        type: "select",
        options: colorOptions,
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

        code: `<cds-mobile-navbar
	:items=[
		{ icon: 'home-outline', label: 'Início', route: { name: 'Google', path: 'www.google.com' } },
		{ icon: 'search-outline', label: 'Busca', route: { name: 'Google', path: 'www.google.com' }  },
		{ icon: 'notification-bell-outline', label: 'Notificações', route: { name: 'Google', path: 'www.google.com' }  },
		{ icon: 'user-outline', label: 'Perfil', route: { name: 'Google', path: 'www.google.com' }  },
	],
	variant="green",
	show-label
/>`,
      },
    },
  },
};

export const MobileNavbar = {
  render: Template.bind({}),
  name: "MobileNavbar",

  args: {
    items: [
      {
        icon: "home-outline",
        label: "Início",

        route: {
          name: "Google",
          path: "www.google.com",
        },
      },
      {
        icon: "search-outline",
        label: "Busca",

        route: {
          name: "Google",
          path: "www.google.com",
        },
      },
      {
        icon: "notification-bell-outline",
        label: "Notificações",

        route: {
          name: "Google",
          path: "www.google.com",
        },
      },
      {
        icon: "user-outline",
        label: "Perfil",

        route: {
          name: "Google",
          path: "www.google.com",
        },
      },
    ],

    variant: "green",
    showLabel: false,
  },
};
