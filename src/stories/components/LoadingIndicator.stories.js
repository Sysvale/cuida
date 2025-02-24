import LoadingIndicator from "../../components/LoadingIndicator.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      showLoadingIndicator: false,
    };
  },
  components: { CdsLoadingIndicator: LoadingIndicator, CdsButton: Button },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-button
				id="trigger-popover"
				@click="showLoadingIndicator = !showLoadingIndicator"
			>
				Toggle LoadingIndicator
			</cds-button>
			<cds-loading-indicator
				v-bind="args"
				style="margin-top: 71px;"
				v-model="showLoadingIndicator"
			/>
		</div>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.showLoadingIndicator);
  },
});

export default {
  title: "Componentes/Loaders/LoadingIndicator",
  component: LoadingIndicator,

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

        code: `<cds-loading-indicator
	v-model="showLoadingIndicator"
	variant="blue"
/>`,
      },
    },
  },
};

export const LoadingIndicator = {
  render: Template.bind({}),
  name: "LoadingIndicator",

  args: {
    intervalTime: 500,
  },
};
