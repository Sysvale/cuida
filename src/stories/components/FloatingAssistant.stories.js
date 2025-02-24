import FloatingAssistant from "../../components/FloatingAssistant.vue";

const Template = (args) => ({
  components: { CdsFloatingAssistant: FloatingAssistant },
  setup() {
    return { args };
  },
  template: /*html*/ `
			<div id="floating-assistant-target" style="width: fit-content;">FloatingAssistant target</div>
			<cds-floating-assistant
				v-bind="args"
				targetId="floating-assistant-target"
			>
				A nova funcionalidade de cadastrar motoristas permite que você organize e
				gerencie a sua frota de forma mais fácil, vinculando cada motorista a seu
				ônibus específico.
			</cds-floating-assistant>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Display/FloatingAssistant",
  component: FloatingAssistant,

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

        code: `<cds-floating-assistant
	v-model="showTip"
	targetId="floating-assistant-target"
	title="Nova funcionalidade!"
	url="https://medium.com/cidade-saud%C3%A1vel"
>
	Conteúdo a ser exibido quando o card for clicado
</cds-floating-assistant>`,
      },
    },
  },
};

export const FloatingAssistant = {
  render: Template.bind({}),
  name: "FloatingAssistant",

  args: {
    modelValue: true,
    url: "https://medium.com/cidade-saud%C3%A1vel",
  },
};
