import MobileNavigation from "../../components/MobileNavigation.vue";

const Template = (args) => ({
  components: { CdsMobileNavigation: MobileNavigation },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="position: relative; overflow: auto; height: 930px;
					width: 430px; border: 1px solid #CCC; margin: auto;
					border-radius: 20px; cursor: pointer">
			<cds-mobile-navigation
				v-bind="args"
				:sidebar-logo="args.light
					? 'https://framerusercontent.com/images/9r26Llo7eNrs3keUxCNEGc8ttYE.png'
					: 'https://framerusercontent.com/images/oZRv3aHh1IPreheg1xQCkBQjQ.png'
				"
				@item-click="logClick"
				@logout="logLogout"
			></cds-mobile-navigation>
		</div>`,
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
    label: "Vigilância sanitária",
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

export default {
  title: "Componentes/Navegação/MobileNavigation",
  component: MobileNavigation,

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

        code: `<cds-mobile-navigation
	v-bind="args"
	@click="logClick"
/>`,
      },
    },
  },
};

export const MobileNavigation = {
  render: Template.bind({}),
  name: "MobileNavigation",

  args: {
    variant: "indigo",
    light: true,
    sidebarLogo:
      "https://framerusercontent.com/images/9r26Llo7eNrs3keUxCNEGc8ttYE.png",
    items: sideBarItems,
    activeItem: sideBarItems[1],

    user: {
      name: "Joana Mendes",
      role: "Administradora",
    },

    sticky: false,
  },
};
