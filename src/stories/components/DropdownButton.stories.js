import DropdownButton from "../../components/DropdownButton.vue";

const Template = (args) => ({
  components: { CdsDropdownButton: DropdownButton },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-dropdown-button
			v-bind="args"
			@action-click="logActionClick"
			@button-click="logClick"
		/>`,
  methods: {
    logActionClick(element) {
      console.info("%clogAction: ", "color: #2C70CD;", element);
    },
    logClick(element) {
      console.info("%clogAction: ", "color: #2C70CD;", element);
    },
  },
});

const items = [
  {
    name: "Cancelar solicitação",
    icon: "block-outline",
  },
  {
    name: "Indeferir solicitação",
    icon: "alert-outline",
  },
  {
    name: "Deferir solicitação",
    icon: "check-outline",
  },
];

export default {
  title: "Componentes/Display/DropdownButton",
  component: DropdownButton,

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

        code: `<cds-dropdown-button
	:items="items"
	:secondary="true"
	text="Finalizar solicitação"
	variant="green"
	@action-click="logActionClick"
	@button-click="logClick"
/>`,
      },
    },
  },
};

export const DropdownButton = {
  render: Template.bind({}),
  name: "DropdownButton",

  args: {
    text: "Finalizar solicitação",
    items: items,
    variant: "green",
    secondary: true,
  },
};
