import InteractionBlockingOverlay from "../../components/InteractionBlockingOverlay.vue";
import Button from "../../components/Button.vue";
import { colorOptions } from "../../utils/constants/colors.js";

const Template = (args) => ({
  setup() {
    return { args };
  },
  components: {
    CdsInteractionBlockingOverlay: InteractionBlockingOverlay,
    CdsButton: Button,
  },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<b>Teste o componente usando o devtools do navegador, alterando a resolução da tela para mobile ou landscape.</b>
			<cds-interaction-blocking-overlay
				v-bind="args"
				@button-click="console.log('button-click')"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Overlays/InteractionBlockingOverlay",
  component: InteractionBlockingOverlay,

  argTypes: {
    blockInteraction: {
      control: {
        type: "select",
        options: ["mobile", "landscape"],
      },
    },

    buttonVariant: {
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

        code: `<cds-interaction-blocking-overlay
	block-interaction="mobile"
/>`,
      },
    },
  },
};

export const InteractionBlockingOverlay = {
  render: Template.bind({}),
  name: "InteractionBlockingOverlay",
};
