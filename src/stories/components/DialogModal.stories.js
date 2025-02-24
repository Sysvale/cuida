import DialogModal from "../../components/DialogModal.vue";
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
  components: { CdsDialogModal: DialogModal, CdsButton: Button },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-button
				id="trigger-popover"
				@click="showModal = true"
			>
				Click
			</cds-button>
			<cds-dialog-modal
				v-bind="args"
				v-model="showModal"
				title="Tem certeza que deseja continuar?"
				description="Esta ação afetará o sistema e
					os arquivos associados. Ao prosseguir, você
					confirma que está ciente e
					concorda com as consequências. Deseja continuar?"
			>
			</cds-dialog-modal>
		</div>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.showModal);
  },
});

export default {
  title: "Componentes/Notificação/DialogModal",
  component: DialogModal,

  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["warning", "error", "info"],
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

        code: `<cds-dialog-modal
	v-model="showModal"
	title="Tem certeza que deseja continuar?"
	description="Esta ação afetará o sistema e
			os arquivos associados. Ao prosseguir, você
			confirma que está ciente e
			concorda com as consequências. Deseja continuar?"
	@close="showModal = false"
	@ok="showModal = false"
>
</cds-dialog-modal>`,
      },
    },
  },
};

export const DialogModal = {
  render: Template.bind({}),
  name: "DialogModal",
};
