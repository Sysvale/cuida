import NavBar from "../../components/NavBar.vue";

const Template = (args) => ({
  components: { CdsNavBar: NavBar },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-nav-bar
			v-bind="args"
			@click="logClick"
		/>`,
  methods: {
    logClick(element) {
      console.info("logAction: ", element);
    },
  },
});

const items = [
  {
    label: "Mapa de grupo de risco",
    route: {
      path: "/mapa",
      name: "principal",
    },
  },
  {
    label: "Liga Saudável",
    route: {
      path: "/liga-saudavel",
      name: "pagina1",
    },
  },
  {
    label: "Mapa de calor dos bairros",
    route: {
      path: "/mapa-de-calor",
      name: "pagina2",
    },
  },
];

export default {
  title: "Componentes/Navegação/NavBar",
  component: NavBar,

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

        code: `<cds-nav-bar
	v-bind="args"
	@click="logClick"
/>`,
      },
    },
  },
};

export const NavBar = {
  render: Template.bind({}),
  name: "NavBar",

  args: {
    items: items,
    activeItem: items[1],
  },
};
