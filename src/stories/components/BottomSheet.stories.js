import BottomSheet from "../../components/BottomSheet.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  components: { CdsBottomSheet: BottomSheet, CdsButton: Button },
  setup() {
    return { args };
  },
  data() {
    return {
      showBottomSheet: false,
    };
  },
  template: /*html*/ `
		<div style="display: flex; justify-content: center">
			<cds-button
				style="margin: 12px;"
				@click="showBottomSheet = true"
			>
				Click
			</cds-button>
			<cds-bottom-sheet
				v-bind="args"
				v-model="showBottomSheet"
			>
				Conteúdo
			</cds-bottom-sheet>
		</div>
	`,
});

export default {
  title: "Componentes/Overlays/BottomSheet",
  component: BottomSheet,

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

        code: `<cds-bottom-sheet
	v-model="showBottomSheet"
	title="Onde encontrar o meu CNS"
>
	Conteúdo
</cds-bottom-sheet>`,
      },
    },
  },
};

export const BottomSheet = {
  render: Template.bind({}),
  name: "BottomSheet",

  args: {
    title: "Onde encontrar o meu CNS",
  },
};
