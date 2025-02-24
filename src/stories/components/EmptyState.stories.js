import EmptyState from "../../components/EmptyState.vue";

const Template = (args) => ({
  components: { CdsEmptyState: EmptyState },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-empty-state
			v-bind="args" 
			@actionButtonClick="logButtonClick"
		/>
	`,
  methods: {
    logButtonClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Display/EmptyState",
  component: EmptyState,

  argTypes: {
    actionButtonVariant: {
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

        code: `
<cds-empty-state
	image="static/media/CuidaTempLogo.f4adb1cc.png"
	image-description="Imagem de empty state"
	title="Título do empty state"
	text="Para sair dessa situação de empty state, realize a ação abaixo"
	action-button-text="Adicionar novo recurso"
	@action-button-click="handleClick"
/>`,
      },
    },
  },
};

export const EmptyState = {
  render: Template.bind({}),
  name: "EmptyState",

  args: {
    image: "https://cdn-icons-png.flaticon.com/512/7486/7486747.png",
    imageDescription: "Imagem de empty state",
    title: "Título do empty state",
    text: "Para sair dessa situação de empty state, realize a ação abaixo",
    actionButtonText: "Adicionar novo recurso",
  },
};
