import WebcamModal from "../../components/WebcamModal.vue";
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
  components: { CdsWebcamModal: WebcamModal, CdsButton: Button },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-button
				@click="showModal = true"
			>
				Click
			</cds-button>
			<cds-webcam-modal
				v-bind="args"
				v-model="showModal"
				@on-take-photo="(file) => console.log('Foto tirada', file)"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Forms/WebcamModal",
  component: WebcamModal,

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

        code: `<cds-webcam-modal
	v-model="showModal"
	title="Tirar uma foto"
	variant="dark"
	@on-take-photo="(file) => console.log('Foto tirada', file)"
/>`,
      },
    },
  },
};

export const WebcamModal = {
  render: Template.bind({}),
  name: "WebcamModal",

  args: {
    variant: "green",
  },
};
