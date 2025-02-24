import Modal from "../../components/Modal.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      showModal: false,
    };
  },
  components: { CdsModal: Modal, CdsButton: Button },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-button
				id="trigger-popover"
				@click="showModal = true"
			>
				Click
			</cds-button>
			<cds-modal
				v-bind="args"
				v-model="showModal"
				@ok="console.info('evento ok emitido!')"
				@cancel="console.info('evento cancelar emitido!')"
				@close="console.info('evento de fechamento de modal emitido!')"
			>
				<span>
					Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
					eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
					leite de mula manquis sem cabeça.
				</span>
			</cds-modal>
		</div>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.showModal);
  },
});

export default {
  title: "Componentes/Overlays/Modal",
  component: Modal,

  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg", "xl"],
      },
    },

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

        code: `<cds-modal
	v-model="showModal"
	@close="showModal = false"
	@ok="showModal = false"
>
	<span>
		Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
		eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
		leite de mula manquis sem cabeça.
	</span>
</cds-modal>`,
      },
    },
  },
};

export const Modal = {
  render: Template.bind({}),
  name: "Modal",
};
